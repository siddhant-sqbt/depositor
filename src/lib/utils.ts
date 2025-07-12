import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFieldRequiredStatus = (schema: z.ZodObject<any>, fieldPath: string): boolean => {
  const fieldParts = fieldPath.split(".");
  let currentSchema = schema;

  for (let i = 0; i < fieldParts.length - 1; i++) {
    const part = fieldParts[i];
    const fieldSchema = currentSchema.shape[part];

    if (fieldSchema instanceof z.ZodObject) {
      currentSchema = fieldSchema;
    } else {
      return false;
    }
  }

  const finalField = fieldParts[fieldParts.length - 1];
  const fieldSchema = currentSchema.shape[finalField];

  return fieldSchema ? !fieldSchema.isOptional() : false;
};
