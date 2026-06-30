import { NextResponse } from "next/server";
import {
  leadRequestSchema,
  type LeadRequestData,
} from "@/lib/validation/form-schema";

async function handleLead(lead: LeadRequestData) {
  // Temporary integration for the first stage. Replace with CRM, email, or Telegram delivery later.
  console.log("Lead received:", lead);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = leadRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Проверьте заполнение формы.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    await handleLead(parsed.data);

    return NextResponse.json(
      { message: "Заявка успешно отправлена." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lead submission failed:", error);

    return NextResponse.json(
      {
        message:
          "Не удалось отправить заявку. Попробуйте еще раз или свяжитесь с нами напрямую.",
      },
      { status: 500 },
    );
  }
}
