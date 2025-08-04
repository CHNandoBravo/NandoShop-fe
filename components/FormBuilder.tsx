
import { ZodTypeAny } from "zod";
import {
  FieldValues,
  UseFormReturn,
  DefaultValues,
  Path,
} from "react-hook-form";

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
  name: Path<T>;  // <-- aquí
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "number" | "select" | "file";
  width?: string;
} & (
  { type: "select"; options: { label: string; value: string|number }[] } |
  { type?: Exclude<"text" | "number" | "file", "select">; options?: never }
);


type FormBuilderProps<T extends FieldValues> = {
  schema: ZodTypeAny;
  form: UseFormReturn<T>;
  defaultValues: DefaultValues<T>;
  fields: FieldDefinition<T>[];
  onSubmit: (data: T) => void;
};


export function FormBuilder<T extends FieldValues>({
  form,
  fields,
  onSubmit,
}: FormBuilderProps<T>) {
const isFile = (val: unknown): val is File =>
  typeof window !== "undefined" && val instanceof File;

    return (
     <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">
          {fields.map((field) => (
            <FormField
              key={String(field.name)}
              control={form.control}
              name={field.name}
              render={({ field: controller }) => (
                <FormItem className={`${field.width ?? "w-full"} mt-3`}>
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
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    ) : field.type === "file" ? (
                      <div>
                        <Input
                          type="file"
                          onChange={(e) => controller.onChange(e.target.files?.[0] ?? null)}
                          ref={controller.ref}
                          className="w-full"
                        />
                        {isFile(controller.value) && (
                          <>
                            <p className="text-sm text-muted-foreground mt-1">
                              Archivo cargado: <strong>{controller.value.name}</strong>
                            </p>
                            {controller.value.type.startsWith("image/") && (
                              <img
                                src={URL.createObjectURL(controller.value)}
                                alt="Preview"
                                className="mt-2 max-h-40 object-contain rounded"
                                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} 
                              />
                            )}
                          </>
                        )}
                        
                      </div>
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
