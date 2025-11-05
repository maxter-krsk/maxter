import { z } from "zod";

const digitsOnly = (v: string) => v.replace(/\D/g, "");

const base = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(50)
    .regex(/^[A-Za-zА-Яа-яЁё\s]+$/, "Только буквы и пробелы"),
  businessName: z
    .string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(100)
    .regex(/^[A-Za-zА-Яа-яЁё\s]+$/, "Только буквы и пробелы"),
  businessDescription: z
    .string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(1000)
    .regex(/^[A-Za-zА-Яа-яЁё\s]+$/, "Только буквы и пробелы"),
});

export const formSchema = base
  .extend({
    contactMethod: z
      .enum(["telegram", "whatsapp", "email", "phone"])
      .optional(),

    telegramUsername: z.string().trim().optional(),
    whatsappPhone: z.string().trim().optional(),
    email: z.string().trim().optional(),
    phone: z.string().trim().optional(),
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

    if (val.contactMethod === "whatsapp") {
      const raw = val.whatsappPhone ?? "";
      const digits = digitsOnly(raw);
      if (digits.length < 10 || digits.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["whatsappPhone"],
          message: "Некорректный номер телефона",
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
  });

export type FormData = z.infer<typeof formSchema>;
