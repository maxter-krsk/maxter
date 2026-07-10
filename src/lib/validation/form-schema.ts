import { z } from "zod";

export const MAX_LEAD_FILE_SIZE = 10 * 1024 * 1024;

export const ACCEPTED_LEAD_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
] as const;

export const ACCEPTED_LEAD_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".jpg",
  ".jpeg",
  ".png",
] as const;

export const LEAD_FILE_ACCEPT = [
  ...ACCEPTED_LEAD_FILE_TYPES,
  ...ACCEPTED_LEAD_FILE_EXTENSIONS,
].join(",");

const digitsOnly = (v: string) => v.replace(/\D/g, "");

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(2, `${label}: минимум 2 символа`)
    .max(max, `${label}: максимум ${max} символов`);

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Максимум ${max} символов`)
    .optional()
    .or(z.literal(""));

const base = z.object({
  name: requiredText("Имя", 80),
  company: requiredText("Компания", 120),
  businessDescription: requiredText("Описание проекта", 2000),
  source: requiredText("Источник", 240),
});

const leadFieldsSchema = base.extend({
  contactMethod: z.enum(["telegram", "email", "phone", "max"]).optional(),

  budget: z.enum(["<1", "2-4", "4-7", "7-15"]),

  telegramUsername: optionalText(64),
  email: optionalText(254),
  phone: optionalText(32),
  maxContact: optionalText(32),
});

type LeadFieldsData = z.infer<typeof leadFieldsSchema>;

function validateContactMethod(val: LeadFieldsData, ctx: z.RefinementCtx) {
  if (!val.contactMethod) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["contactMethod"],
      message: "Выберите способ связи",
    });
    return;
  }

  if (val.contactMethod === "telegram") {
    const username = val.telegramUsername ?? "";
    if (!username) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["telegramUsername"],
        message: "Укажите username",
      });
    } else if (!/^@?[a-zA-Z0-9_]{3,32}$/.test(username)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["telegramUsername"],
        message: "Некорректный username",
      });
    }
  }

  if (val.contactMethod === "email") {
    const email = val.email ?? "";
    const emailResult = z.string().email().safeParse(email);
    if (!email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Укажите email",
      });
    } else if (!emailResult.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Некорректный email",
      });
    }
  }

  if (val.contactMethod === "phone") {
    const digits = digitsOnly(val.phone ?? "");
    if (digits.length < 10 || digits.length > 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Некорректный номер телефона",
      });
    }
  }

  if (val.contactMethod === "max") {
    const digits = digitsOnly(val.maxContact ?? "");
    if (digits.length < 10 || digits.length > 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxContact"],
        message: "Некорректный номер телефона",
      });
    }
  }
}

const leadFileSchema = z
  .custom<File>(
    (value) => typeof File !== "undefined" && value instanceof File,
    "Некорректный файл",
  )
  .refine(
    (file) => file.size <= MAX_LEAD_FILE_SIZE,
    "Размер файла не должен превышать 10 МБ",
  )
  .refine(
    (file) =>
      ACCEPTED_LEAD_FILE_TYPES.includes(
        file.type as (typeof ACCEPTED_LEAD_FILE_TYPES)[number],
      ),
    "Допустимы PDF, DOC, DOCX, XLS, XLSX, JPG и PNG",
  );

export const leadRequestSchema = leadFieldsSchema.superRefine(
  validateContactMethod,
);

export const formSchema = leadFieldsSchema
  .extend({ file: leadFileSchema.optional() })
  .superRefine(validateContactMethod);

export type FormData = z.infer<typeof formSchema>;
export type LeadRequestData = z.infer<typeof leadRequestSchema>;
