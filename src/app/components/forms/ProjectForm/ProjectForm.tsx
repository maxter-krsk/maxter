"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "@/lib/validation/form-schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { cn } from "@/lib/utils";

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

export function ProjectForm() {
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
        className="flex flex-col gap-10"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя*</FormLabel>
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
                <FormLabel>Компания*</FormLabel>
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
            <FormItem>
              <FormLabel>О проекте*</FormLabel>
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
              <FormItem>
                <FormLabel>Прикрепить файл</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    {...rest}
                  />
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
                <div className="grid gap-3 sm:grid-cols-4">
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ связи" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {contactMethod === "telegram" && (
          <FormField
            control={form.control}
            name="telegramUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram username*</FormLabel>
                <FormControl>
                  <Input placeholder="@username" {...field} />
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
              <FormItem>
                <FormLabel>Телефон*</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    {...field}
                  />
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
              <FormItem>
                <FormLabel>E-mail*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@email.com" {...field} />
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
              <FormItem>
                <FormLabel>MAX (номер телефона)*</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
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
            <FormItem>
              <FormLabel>Откуда вы узнали о нас?*</FormLabel>
              <FormControl>
                <Input placeholder="Ваш ответ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="border border-carbon dark:border-paper bg-carbon text-paper dark:bg-paper dark:text-carbon py-4 uppercase font-unbounded text-14"
        >
          Начать проект
        </button>
      </form>
    </Form>
  );
}
