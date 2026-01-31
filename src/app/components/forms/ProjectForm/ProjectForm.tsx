"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "@/lib/validation/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { Textarea } from "@/lib/ui/textarea";
import { DiagonalFill } from "@/lib/ui/DiagonalFill";
import { cn } from "@/lib/utils";
import { Separator } from "@/lib/ui/separator";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import Image from "next/image";

const budgets = [
  { value: "<1", label: "МЕНЕЕ 1 МЛН" },
  { value: "2-4", label: "2–4 МЛН" },
  { value: "4-7", label: "4–7 МЛН" },
  { value: "7-15", label: "7–15 МЛН" },
];

const contactOptions = [
  { value: "telegram", label: "Telegram" },
  { value: "phone", label: "Телефон" },
  { value: "email", label: "Почта" },
  { value: "max", label: "MAX" },
];

type Props = {
  className?: string;
};

export function ProjectForm({ className }: Props) {
  const fileId = useId();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      businessDescription: "",
      source: "",
      contactMethod: undefined,
      telegramUsername: "",
      whatsappPhone: "",
      email: "",
      phone: "",
      maxContact: "",
    },
  });

  const contactMethod = form.watch("contactMethod");

  const onSubmit = (data: FormData) => {
    console.log("Project form submit:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col", className)}
      >
        <div className="grid gap-20 md:grid-cols-2 mb-40">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Имя*" {...field} />
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
                <FormControl>
                  <Input placeholder="Компания*" {...field} />
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
            <FormItem className="mb-40">
              <h3 className="mb-20 uppercase text-22 font-unbounded">
                О проекте*
              </h3>
              <FormControl>
                <Textarea
                  placeholder="Расскажите о вашем проекте*"
                  className="min-h-160"
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
            const { onChange, value, ...rest } = field;
            return (
              <FormItem className="flex justify-between mb-40">
                <ul className="space-y-10 font-light text-14">
                  <li>1. Из какой вы компании, чем она занимается?</li>
                  <li>
                    2. С чем мы можем помочь? Как представляете результат?
                  </li>
                  <li>3. На какой срок работы и бюджет рассчитываете?</li>
                  <li>4. Напишите, если удобнее общаться в мессенджере.</li>
                </ul>
                <FormControl className="cursor-pointer">
                  <div className="flex items-center">
                    <label
                      htmlFor={fileId}
                      className="inline-flex items-center gap-20 uppercase text-16 font-unbounded cursor-pointer"
                    >
                      <span className="grid p-10 border border-carbon dark:border-paper">
                        <Image
                          src="/icons/ui/form/clip-dark.svg"
                          width="28"
                          height="28"
                          alt="Прикрепить файл"
                          className="block dark:hidden w-28 h-28"
                        />
                        <Image
                          src="/icons/ui/form/clip-light.svg"
                          width="28"
                          height="28"
                          alt="Прикрепить файл"
                          className="hidden dark:block w-20 h-20"
                        />
                      </span>
                      Прикрепить файл
                    </label>
                    <Input
                      id={fileId}
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      className="sr-only"
                      {...rest}
                    />
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
              <h6 className="mb-20 uppercase text-22 font-unbounded">
                Бюджет*
              </h6>
              <FormControl>
                <div className="grid gap-3 sm:grid-cols-4 mb-40">
                  {budgets.map((item) => {
                    const active = field.value === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => field.onChange(item.value)}
                        className={cn(
                          "border border-carbon dark:border-paper px-4 py-3 text-12 uppercase transition-colors",
                          active
                            ? "bg-carbon text-paper dark:bg-paper dark:text-carbon"
                            : "hover:bg-carbon hover:text-paper dark:hover:bg-paper dark:hover:text-carbon",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <Separator className="w-full bg-carbon mb-40" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactMethod"
          render={({ field }) => (
            <FormItem>
              <h5 className="mb-20 uppercase text-22 font-unbounded">
                Способ связи*
              </h5>
              <FormControl>
                <div className="grid gap-12 sm:grid-cols-2 mb-40">
                  {contactOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-10 text-14 cursor-pointer"
                    >
                      <Checkbox
                        checked={field.value === opt.value}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange(opt.value);
                        }}
                        size="lg"
                        className="border-carbon dark:border-paper w-20 h-20 rounded-full"
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
              <FormItem className="mb-40 w-[50%]">
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
              <FormItem className="mb-40 w-[50%]">
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
              <FormItem className="mb-40 w-[50%]">
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
              <FormItem className="mb-40 w-[50%]">
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
            <FormItem className="mb-40">
              <h1 className="mb-20 uppercase text-22 font-unbounded">
                Откуда вы узнали о нас?*
              </h1>
              <FormControl>
                <Input placeholder="Ваш ответ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DiagonalFill
          type="submit"
          className="cursor-pointer border border-carbon dark:border-paper py-16 px-10 w-full"
        >
          Начать проект
        </DiagonalFill>
      </form>
    </Form>
  );
}
