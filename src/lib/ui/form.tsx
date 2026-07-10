"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/lib/ui/tooltip";

import { cn } from "@/lib/utils";
import { Label } from "@/lib/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("relative grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        "mb-12 font-unbounded text-16 leading-20 uppercase text-carbon sm:mb-16 sm:text-18 sm:leading-22 lg:mb-20 lg:text-22 lg:leading-26",
        "data-[error=true]:text-invalid dark:text-paper dark:data-[error=true]:text-invalid-dark",
        className,
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      className={cn("relative w-full", className)}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";

type FormMessageProps = React.ComponentProps<"div"> & {
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  alignOffset?: number;
  dotSide?: "left" | "right";
};

function FormMessage({
  className,
  side = "right",
  align = "center",
  sideOffset = 12,
  alignOffset = 0,
  dotSide = "right",
  ...rest
}: FormMessageProps) {
  const { error, formMessageId } = useFormField();
  const message = error ? String(error?.message ?? "") : rest.children;
  if (!message) return null;

  return (
    <Tooltip open={!!error} delayDuration={0}>
      <TooltipTrigger asChild>
        <span
          data-slot="form-error-dot"
          className={cn(
            "pointer-events-none absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-invalid dark:bg-invalid-dark",
            dotSide === "right" ? "right-12" : "left-12",
          )}
        />
      </TooltipTrigger>

      <TooltipContent
        id={formMessageId}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(
          "max-w-[15.625rem] rounded-none bg-carbon p-16 text-paper dark:bg-paper dark:text-carbon",
          className,
        )}
      >
        <p className="uppercase mb-10 text-12 font-light font-unbounded">
          ОБЯЗАТЕЛЬНОЕ ПОЛЕ
        </p>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
