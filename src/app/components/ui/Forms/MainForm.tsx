"use client";

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

export function MainForm() {

  return (
    <section>
      <div className="container">
        Форма основная
      </div>
    </section>
  );
}
