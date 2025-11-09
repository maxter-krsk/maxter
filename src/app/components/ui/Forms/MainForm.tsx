"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "@/lib/validation/form-schema";
import {
  FlipButton,
  FlipButtonBack,
  FlipButtonFront,
} from "@/animate-ui/components/buttons/flip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
} from "@/components/animate-ui/primitives/radix/radio-group";
import { Input } from "@/lib/ui/input";
import { PatternFormat } from "react-number-format";
import { Label } from "@/lib/ui/label";
import { Textarea } from "@/lib/ui/textarea";
import { Separator } from "@/lib/ui/separator";

export function MainForm() {
  const mainForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      businessDescription: "",
      contactMethod: undefined,
      telegramUsername: "",
      whatsappPhone: "",
      email: "",
      phone: "",
      budget: undefined,
      source: "",
    },
    mode: "onBlur",
    shouldUnregister: true,
    criteriaMode: "all",
  });

  const onSubmit = (data: FormData) => console.log(data);
  const method = mainForm.watch("contactMethod");

  const questions = [
    {
      question: "1. Из какой вы компании, чем она занимается?",
    },
    {
      question: "2. С чем мы можем помочь? Как представляете результат?",
    },
    {
      question: "3. На какой срок работы и бюджет рассчитываете?",
    },
    {
      question: "4. Напишите, если удобнее общаться в мессенджере.",
    },
  ];

  const file = mainForm.watch("file");

  return (
    <Form {...mainForm}>
      <form
        className="flex flex-col gap-20"
        onSubmit={mainForm.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-20">
          <FormField
            name="name"
            control={mainForm.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      placeholder="Имя"
                      {...field}
                      value={field.value ?? ""}
                      className="w-full"
                    />
                    <FormMessage side="right" align="center" dotSide="right" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="company"
            control={mainForm.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      placeholder="Компания*"
                      {...field}
                      value={field.value ?? ""}
                      className="w-full"
                    />
                    <FormMessage side="bottom" align="end" dotSide="right" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        </div>

        <FormField
          name="contactMethod"
          control={mainForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выберете удобный способ для связи:</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  className="grid grid-cols-[max-content_max-content] gap-x-70 gap-y-10 text-carbon dark:text-paper"
                >
                  <div className="flex items-center gap-12">
                    <RadioGroupItem id="cm-telegram" value="telegram">
                      <RadioGroupIndicator />
                    </RadioGroupItem>
                    <Label htmlFor="cm-telegram">Telegram</Label>
                  </div>

                  <div className="flex items-center gap-12">
                    <RadioGroupItem id="cm-whatsapp" value="whatsapp">
                      <RadioGroupIndicator />
                    </RadioGroupItem>
                    <Label htmlFor="cm-whatsapp">WhatsApp</Label>
                  </div>

                  <div className="flex items-center gap-12">
                    <RadioGroupItem id="cm-email" value="email">
                      <RadioGroupIndicator />
                    </RadioGroupItem>
                    <Label htmlFor="cm-email">Email</Label>
                  </div>
                  <div className="flex items-center gap-12">
                    <RadioGroupItem id="cm-phone" value="phone">
                      <RadioGroupIndicator />
                    </RadioGroupItem>
                    <Label htmlFor="cm-phone">Звонок</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        {method === "telegram" && (
          <FormField
            name="telegramUsername"
            control={mainForm.control}
            render={({ field }) => {
              const raw = field.value ?? "";
              const display = raw.startsWith("@") ? raw : raw ? `@${raw}` : "";

              return (
                <FormItem>
                  <FormLabel>Ваше имя в Telegram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="@username"
                      value={display}
                      onChange={(e) => {
                        const next = e.target.value.replace(/^@+/, "");
                        field.onChange(next);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        {method === "whatsapp" && (
          <FormField
            name="whatsappPhone"
            control={mainForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш номер телефона WhatsApp</FormLabel>
                <FormControl>
                  <PatternFormat
                    className="py-14 px-30 text-16 text-carbon dark:text-paper border border-carbon dark:border-paper"
                    format="+7 (###) ###-##-##"
                    mask="_"
                    allowEmptyFormatting
                    value={field.value ?? ""}
                    onValueChange={(v) => field.onChange(v.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        )}

        {method === "email" && (
          <FormField
            name="email"
            control={mainForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.ru"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        )}

        {method === "phone" && (
          <FormField
            name="phone"
            control={mainForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш номер телефона</FormLabel>
                <FormControl>
                  <div>
                    <PatternFormat
                      className="py-14 px-30 text-16 w-full text-carbon dark:text-paper border border-carbon dark:border-paper"
                      format="+7 (###) ###-##-##"
                      mask="_"
                      allowEmptyFormatting
                      value={field.value ?? ""}
                      onValueChange={(v) => field.onChange(v.value)}
                    />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        )}

        <FormField
          name="businessDescription"
          control={mainForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-22 mb-20">
                О проекте*
              </FormLabel>
              <FormControl className="rounded-none">
                <div>
                  <Textarea
                    placeholder="Расскажите о вашем проекте*"
                    {...field}
                    value={field.value ?? ""}
                    className="h-200 w-full"
                  />
                  <FormMessage side="bottom" align="start" dotSide="left" />
                </div>
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <div className="flex space-x-200 items-start">
          <ul className="text-left text-14 space-y-10 text-carbon dark:text-paper">
            {questions.map((i) => (
              <li key={i.question}>
                <p>{i.question}</p>
              </li>
            ))}
          </ul>
          <FormField
            name="file"
            control={mainForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="file" className="sr-only">
                  Прикрепить файл
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="file"
                      className="flex items-center gap-20 cursor-pointer"
                    >
                      <div className="border border-carbon dark:border-paper p-10">
                        <Image
                          src="/icons/ui/form/clip-dark.svg"
                          alt="Скрепка"
                          width={28}
                          height={28}
                          className="dark:hidden"
                        />
                        <Image
                          src="/icons/ui/form/clip-light.svg"
                          alt="Скрепка"
                          width={28}
                          height={28}
                          className="dark:block hidden"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="uppercase font-unbounded text-16 text-carbon dark:text-paper">
                          Прикрепить файл
                        </span>
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            mainForm.setValue("file", e.target.files?.[0])
                          }
                        />

                        {file && (
                          <span className="text-14 text-carbon dark:text-paper">
                            {file.name}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>

        <FormField
          name="budget"
          control={mainForm.control}
          render={({ field }) => {
            const options = [
              { value: "<1", label: "Менее 1 млн" },
              { value: "2-4", label: "2–4 млн" },
              { value: "4-7", label: "4–7 млн" },
              { value: "7-15", label: "7–15 млн" },
            ];
            return (
              <FormItem>
                <FormControl>
                  <div>
                    <FormLabel>Бюджет*</FormLabel>
                    <RadioGroup
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      className="grid grid-cols-4 gap-20"
                    >
                      {options.map((i) => (
                        <RadioGroupItem
                          key={i.value}
                          value={i.value}
                          className="cursor-pointer py-14 px-64 border border-carbon text-carbon dark:text-paper dark:border-paper data-[state=checked]:bg-carbon data-[state=checked]:dark:bg-toxic data-[state=checked]:text-paper data-[state=checked]:dark:text-carbon data-[state=unchecked]:bg-transparent transition-colors"
                        >
                          <span className="text-16">{i.label}</span>
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                    <FormMessage side="bottom" dotSide="right" />
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />

        <Separator className="w-full h-[0.063rem] bg-carbon dark:bg-paper my-20" />

        <FormField
          name="source"
          control={mainForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Откуда узнали о нас?*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ваш ответ"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FlipButton type="submit">
          <FlipButtonFront className="w-full">Начать проект</FlipButtonFront>
          <FlipButtonBack className="w-full">Начать проект</FlipButtonBack>
        </FlipButton>
      </form>
    </Form>
  );
}
