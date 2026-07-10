import { NextResponse } from "next/server";
import { checkLeadRateLimit } from "@/lib/security/lead-rate-limit";
import {
  ACCEPTED_LEAD_FILE_EXTENSIONS,
  ACCEPTED_LEAD_FILE_TYPES,
  leadRequestSchema,
  MAX_LEAD_FILE_SIZE,
  type LeadRequestData,
} from "@/lib/validation/form-schema";

export const runtime = "nodejs";

const MAX_REQUEST_SIZE = MAX_LEAD_FILE_SIZE + 64 * 1024;
const MIN_FORM_FILL_TIME = 500;
const MAX_FORM_AGE = 24 * 60 * 60 * 1000;

type LeadFile = {
  name: string;
  type: string;
  size: number;
  bytes: Uint8Array;
};

async function readFormDataWithLimit(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let totalSize = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalSize += value.byteLength;
    if (totalSize > MAX_REQUEST_SIZE) {
      await reader.cancel();
      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalSize);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new Response(body.buffer, {
    headers: { "Content-Type": request.headers.get("content-type") ?? "" },
  }).formData();
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  const candidate =
    request.headers.get("x-real-ip")?.trim() || forwardedFor?.trim();

  if (candidate && /^[0-9a-f:.]{3,45}$/i.test(candidate)) return candidate;

  const userAgent = request.headers.get("user-agent")?.slice(0, 120);
  return `unknown:${userAgent || "no-user-agent"}`;
}

function isSpam(formData: FormData) {
  if (getString(formData, "website").trim()) return true;

  const startedAt = Number(getString(formData, "startedAt"));
  const elapsed = Date.now() - startedAt;

  return (
    !Number.isFinite(startedAt) ||
    elapsed < MIN_FORM_FILL_TIME ||
    elapsed > MAX_FORM_AGE
  );
}

function getFileExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";
}

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

async function hasValidFileSignature(file: File, extension: string) {
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());

  if (extension === ".pdf") {
    return startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]);
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return startsWith(bytes, [0xff, 0xd8, 0xff]);
  }

  if (extension === ".png") {
    return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }

  if (extension === ".doc" || extension === ".xls") {
    return startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  }

  if (extension === ".docx" || extension === ".xlsx") {
    return (
      startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) ||
      startsWith(bytes, [0x50, 0x4b, 0x05, 0x06]) ||
      startsWith(bytes, [0x50, 0x4b, 0x07, 0x08])
    );
  }

  return false;
}

async function parseLeadFile(fileValue: FormDataEntryValue | null) {
  if (!(fileValue instanceof File) || fileValue.size === 0) return null;

  const extension = getFileExtension(fileValue.name);
  const hasSafeName =
    fileValue.name.length <= 255 &&
    !/[\\/\u0000-\u001f\u007f]/.test(fileValue.name);
  const hasAcceptedType = ACCEPTED_LEAD_FILE_TYPES.includes(
    fileValue.type as (typeof ACCEPTED_LEAD_FILE_TYPES)[number],
  );
  const hasAcceptedExtension = ACCEPTED_LEAD_FILE_EXTENSIONS.includes(
    extension as (typeof ACCEPTED_LEAD_FILE_EXTENSIONS)[number],
  );

  if (!hasSafeName || !hasAcceptedType || !hasAcceptedExtension) {
    return { error: "unsupported" as const };
  }

  if (fileValue.size > MAX_LEAD_FILE_SIZE) {
    return { error: "too-large" as const };
  }

  if (!(await hasValidFileSignature(fileValue, extension))) {
    return { error: "unsupported" as const };
  }

  return {
    file: {
      name: fileValue.name,
      type: fileValue.type,
      size: fileValue.size,
      bytes: new Uint8Array(await fileValue.arrayBuffer()),
    } satisfies LeadFile,
  };
}

async function handleLead(lead: LeadRequestData, file: LeadFile | null) {
  // Здесь будет подключена отправка в выбранный канал: CRM, почту или Telegram.
  // Персональные данные намеренно не выводятся в серверные логи.
  void lead;
  void file;
}

export async function POST(request: Request) {
  const rateLimit = checkLeadRateLimit(getClientKey(request));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "Слишком много попыток. Попробуйте отправить заявку позже." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      },
    );
  }

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      return NextResponse.json(
        { message: "Не удалось обработать заявку." },
        { status: 415 },
      );
    }

    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { message: "Размер заявки превышает допустимый лимит." },
        { status: 413 },
      );
    }

    const formData = await readFormDataWithLimit(request);

    if (!formData) {
      return NextResponse.json(
        { message: "Размер заявки превышает допустимый лимит." },
        { status: 413 },
      );
    }

    if (isSpam(formData)) {
      return NextResponse.json(
        { message: "Заявка успешно отправлена." },
        { status: 201 },
      );
    }

    const parsed = leadRequestSchema.safeParse({
      name: getString(formData, "name"),
      company: getString(formData, "company"),
      businessDescription: getString(formData, "businessDescription"),
      source: getString(formData, "source"),
      budget: getString(formData, "budget"),
      contactMethod: getString(formData, "contactMethod") || undefined,
      telegramUsername: getString(formData, "telegramUsername"),
      email: getString(formData, "email"),
      phone: getString(formData, "phone"),
      maxContact: getString(formData, "maxContact"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Проверьте заполнение формы." },
        { status: 400 },
      );
    }

    const parsedFile = await parseLeadFile(formData.get("file"));

    if (parsedFile && "error" in parsedFile) {
      const isTooLarge = parsedFile.error === "too-large";
      return NextResponse.json(
        {
          message: isTooLarge
            ? "Размер файла не должен превышать 10 МБ."
            : "Недопустимый формат файла.",
        },
        { status: isTooLarge ? 413 : 415 },
      );
    }

    await handleLead(parsed.data, parsedFile?.file ?? null);

    return NextResponse.json(
      { message: "Заявка успешно отправлена." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lead submission failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      {
        message:
          "Не удалось отправить заявку. Попробуйте еще раз или свяжитесь с нами напрямую.",
      },
      { status: 500 },
    );
  }
}
