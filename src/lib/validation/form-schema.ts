import { z } from "zod";

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
  fileName: optionalText(255),
  source: requiredText("Источник", 240),
});

export const formSchema = base
  .extend({
    contactMethod: z.enum(["telegram", "email", "phone", "max"]).optional(),

    budget: z.enum(["<1", "2-4", "4-7", "7-15"]),

    telegramUsername: z.string().trim().optional(),
    email: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    maxContact: z.string().trim().optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.contactMethod) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["contactMethod"],
        message: "Выберите способ связи",
      });
      return;
    }

    if (val.contactMethod === "telegram") {
      const u = val.telegramUsername ?? "";
      if (!u) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["telegramUsername"],
          message: "Укажите username",
        });
      } else if (!/^@?[a-zA-Z0-9_]{3,}$/.test(u)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["telegramUsername"],
          message: "Некорректный username",
        });
      }
    }

    if (val.contactMethod === "email") {
      const e = val.email ?? "";
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Укажите email",
        });
      } else if (!emailRe.test(e)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Некорректный email",
        });
      }
    }

    if (val.contactMethod === "phone") {
      const raw = val.phone ?? "";
      const digits = digitsOnly(raw);
      if (digits.length < 10 || digits.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Некорректный номер телефона",
        });
      }
    }

    if (val.contactMethod === "max") {
      const raw = val.maxContact ?? "";
      const digits = digitsOnly(raw);
      if (digits.length < 10 || digits.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["maxContact"],
          message: "Некорректный номер телефона",
        });
      }
    }
  });

export type FormData = z.infer<typeof formSchema>;
export type LeadRequestData = FormData;
export const leadRequestSchema = formSchema;
