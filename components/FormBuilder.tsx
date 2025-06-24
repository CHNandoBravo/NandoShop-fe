
import { z, ZodTypeAny } from "zod";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export type FieldDefinition<T> = {
  name: keyof T;
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "number" | "select";
  width?: string;
  options?: { label: string; value: any }[]; 
};

type FormBuilderProps<T extends FieldValues> = {
  schema: ZodTypeAny;
  defaultValues: DefaultValues<T>;
  fields: FieldDefinition<T>[];
  onSubmit: (data: T) => void;
};

export function FormBuilder<T extends FieldValues>({
  schema,
  defaultValues,
  fields,
  onSubmit,
}: FormBuilderProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

    return (
     <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">
          {fields.map((field) => (
            <FormField
              key={String(field.name)}
              control={form.control}
              name={field.name as any}
              render={({ field: controller }) => (
                <FormItem className={`${field.width ?? "w-full"}`}>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === "select" && field.options ? (
                      <Select
                        onValueChange={(val) => controller.onChange(Number(val))}
                        defaultValue={controller.value?.toString()}
                        >
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        placeholder={field.placeholder}
                        type={field.type || "text"}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (field.type === "number") {
                                controller.onChange(value === "" ? undefined : Number(value));
                            } else {
                                controller.onChange(value);
                            }
                            }}
                        value={controller.value ?? ""}
                        ref={controller.ref}
                        className="w-full"
                        />

                    )}
                  </FormControl>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="w-full">
            <Button type="submit" className="w-full sm:w-auto mt-4">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

}
