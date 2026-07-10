"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSchema,
  LEAD_FILE_ACCEPT,
  type FormData as ProjectFormData,
} from "@/lib/validation/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { Textarea } from "@/lib/ui/textarea";
import { DiagonalFill } from "@/lib/ui/DiagonalFill";
import { cn } from "@/lib/utils";
import { Separator } from "@/lib/ui/separator";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";

const budgets = [
  { value: "<1", label: "МЕНЕЕ 1 МЛН" },
  { value: "2-4", label: "2–4 МЛН" },
  { value: "4-7", label: "4–7 МЛН" },
  { value: "7-15", label: "7–15 МЛН" },
] as const;

const contactOptions = [
  { value: "telegram", label: "Telegram" },
  { value: "phone", label: "Телефон" },
  { value: "email", label: "Почта" },
  { value: "max", label: "MAX" },
] as const;

type Props = {
  className?: string;
};

export function ProjectForm({ className }: Props) {
  const fileId = useId();
  const honeypotId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const formStartedAtRef = useRef(Date.now());
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      businessDescription: "",
      file: undefined,
      source: "",
      contactMethod: undefined,
      telegramUsername: "",
      email: "",
      phone: "",
      maxContact: "",
      budget: undefined,
    },
  });

  const contactMethod = form.watch("contactMethod");

  const onSubmit = async (data: ProjectFormData) => {
    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const payload = new window.FormData();

      payload.set("name", data.name);
      payload.set("company", data.company);
      payload.set("businessDescription", data.businessDescription);
      payload.set("source", data.source);
      payload.set("budget", data.budget);
      payload.set("contactMethod", data.contactMethod ?? "");
      payload.set("telegramUsername", data.telegramUsername ?? "");
      payload.set("email", data.email ?? "");
      payload.set("phone", data.phone ?? "");
      payload.set("maxContact", data.maxContact ?? "");
      payload.set("website", honeypotRef.current?.value ?? "");
      payload.set("startedAt", String(formStartedAtRef.current));

      if (data.file) payload.set("file", data.file);

      const response = await fetch("/api/lead", {
        method: "POST",
        body: payload,
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setSubmitState("error");
        setSubmitMessage(
          result?.message ??
            "Не удалось отправить заявку. Попробуйте еще раз немного позже.",
        );
        return;
      }

      form.reset({
        name: "",
        company: "",
        businessDescription: "",
        file: undefined,
        source: "",
        contactMethod: undefined,
        telegramUsername: "",
        email: "",
        phone: "",
        maxContact: "",
        budget: undefined,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      formStartedAtRef.current = Date.now();
      setSubmitState("success");
      setSubmitMessage(
        result?.message ??
          "Спасибо! Мы получили заявку и свяжемся с вами после обработки.",
      );
    } catch {
      setSubmitState("error");
      setSubmitMessage(
        "Не удалось отправить заявку. Проверьте соединение и попробуйте снова.",
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col", className)}
        noValidate
      >
        <div
          className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={honeypotId}>Не заполняйте это поле</label>
          <input
            ref={honeypotRef}
            id={honeypotId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {submitState !== "idle" && submitState !== "loading" ? (
          <div className="mb-24 space-y-10 sm:mb-32">
            {submitState === "success" && (
              <div
                role="status"
                className="border border-carbon bg-carbon/[0.04] px-14 py-12 text-14 leading-20 dark:border-toxic dark:bg-toxic/10 dark:text-paper sm:px-16 sm:py-14 sm:text-16"
              >
                {submitMessage}
              </div>
            )}
            {submitState === "error" && (
              <div
                role="alert"
                className="border border-invalid bg-invalid/[0.04] px-14 py-12 text-14 leading-20 text-invalid dark:border-invalid-dark dark:bg-invalid-dark/10 dark:text-invalid-dark sm:px-16 sm:py-14 sm:text-16"
              >
                {submitMessage}
              </div>
            )}
          </div>
        ) : null}

        <div className="mb-30 grid gap-24 sm:mb-40 md:grid-cols-2 md:gap-20">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя*</FormLabel>
                <FormControl>
                  <Input placeholder="Имя*" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Компания*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Компания*"
                    autoComplete="organization"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="businessDescription"
          render={({ field }) => (
            <FormItem className="mb-30 sm:mb-40">
              <FormLabel>О проекте*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите о вашем проекте*"
                  className="min-h-120 sm:min-h-140 lg:min-h-160"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            const { onChange } = field;

            return (
              <FormItem className="mb-30 grid gap-20 sm:mb-40 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-40">
                <ul className="space-y-8 text-14 leading-20 font-light sm:space-y-10 sm:text-16 sm:leading-24 lg:text-14 lg:leading-20">
                  <li>1. Из какой вы компании, чем она занимается?</li>
                  <li>
                    2. С чем мы можем помочь? Как представляете результат?
                  </li>
                  <li>3. На какой срок работы и бюджет рассчитываете?</li>
                  <li>4. Напишите, если удобнее общаться в мессенджере.</li>
                </ul>
                <FormControl className="cursor-pointer">
                  <div className="flex flex-col items-start gap-10">
                    <label
                      htmlFor={fileId}
                      className="group inline-flex cursor-pointer items-center gap-12 font-unbounded text-14 uppercase sm:gap-20 sm:text-16"
                    >
                      <span className="grid border border-carbon p-8 transition-colors group-hover:bg-carbon dark:border-paper dark:group-hover:border-toxic dark:group-hover:bg-toxic sm:p-10">
                        <Image
                          src="/icons/ui/form/clip-dark.svg"
                          width={28}
                          height={28}
                          alt="Прикрепить файл"
                          className="block h-24 w-24 transition-[filter] group-hover:brightness-0 group-hover:invert sm:h-28 sm:w-28 dark:hidden"
                        />
                        <Image
                          src="/icons/ui/form/clip-light.svg"
                          width={28}
                          height={28}
                          alt="Прикрепить файл"
                          className="hidden h-20 w-20 transition-[filter] group-hover:brightness-0 dark:block"
                        />
                      </span>
                      Прикрепить файл
                    </label>
                    <Input
                      id={fileId}
                      type="file"
                      accept={LEAD_FILE_ACCEPT}
                      ref={(node) => {
                        field.ref(node);
                        fileInputRef.current = node;
                      }}
                      onChange={(event) => onChange(event.target.files?.[0])}
                      className="sr-only"
                    />
                    {field.value ? (
                      <span className="max-w-full break-all text-12 leading-16 text-ash dark:text-paper/70 sm:text-14 sm:leading-20">
                        {field.value.name}
                      </span>
                    ) : null}
                    <span className="text-12 leading-16 text-ash dark:text-paper/60">
                      PDF, DOC, DOCX, XLS, XLSX, JPG или PNG — до 10 МБ
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Бюджет*</FormLabel>
              <FormControl>
                <div className="mb-30 grid grid-cols-2 gap-8 sm:mb-40 sm:grid-cols-4 sm:gap-3">
                  {budgets.map((item) => {
                    const active = field.value === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => field.onChange(item.value)}
                        className={cn(
                          "min-h-44 border border-carbon px-8 py-10 text-10 uppercase transition-colors sm:min-h-0 sm:px-4 sm:py-3 sm:text-12 dark:border-paper",
                          "focus-visible:outline-none focus-visible:border-maxter dark:focus-visible:border-toxic",
                          active
                            ? "bg-carbon text-paper dark:border-toxic dark:bg-toxic dark:text-carbon"
                            : "hover:bg-carbon hover:text-paper dark:hover:border-toxic dark:hover:bg-toxic dark:hover:text-carbon",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <Separator className="mb-30 w-full bg-carbon dark:bg-paper sm:mb-40" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Способ связи*</FormLabel>
              <FormControl>
                <div className="mb-30 grid gap-12 sm:mb-40 sm:grid-cols-2 sm:gap-16">
                  {contactOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex min-h-32 cursor-pointer items-center gap-10 text-14 sm:text-16"
                    >
                      <Checkbox
                        checked={field.value === opt.value}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange(opt.value);
                        }}
                        size="lg"
                        className="h-20 w-20 rounded-full border-carbon bg-transparent data-[state=checked]:border-carbon data-[state=checked]:bg-transparent dark:border-paper dark:data-[state=checked]:border-toxic dark:data-[state=checked]:bg-transparent"
                        indicator="dot"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {contactMethod === "telegram" && (
          <FormField
            control={form.control}
            name="telegramUsername"
            render={({ field }) => (
              <FormItem className="mb-30 w-full sm:mb-40 md:max-w-md">
                <FormLabel>Telegram username*</FormLabel>
                <FormControl>
                  <Input placeholder="@username*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {contactMethod === "phone" && (
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-30 w-full sm:mb-40 md:max-w-md">
                <FormLabel>Телефон*</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Телефон*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {contactMethod === "email" && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-30 w-full sm:mb-40 md:max-w-md">
                <FormLabel>E-mail*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="E-mail*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {contactMethod === "max" && (
          <FormField
            control={form.control}
            name="maxContact"
            render={({ field }) => (
              <FormItem className="mb-30 w-full sm:mb-40 md:max-w-md">
                <FormLabel>MAX*</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="MAX (номер телефона)*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="mb-30 sm:mb-40">
              <FormLabel>Откуда вы узнали о нас?*</FormLabel>
              <FormControl>
                <Input placeholder="Ваш ответ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DiagonalFill
          type="submit"
          disabled={submitState === "loading"}
          aria-busy={submitState === "loading"}
          className="w-full cursor-pointer border border-carbon px-10 py-14 font-unbounded text-14 dark:border-paper sm:py-16 sm:text-16 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState === "loading" ? "Отправляем заявку..." : "Начать проект"}
        </DiagonalFill>
      </form>
    </Form>
  );
}
