import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";
import type { IAttachment } from "./types";

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

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file); // includes MIME type prefix like data:application/pdf;base64,...
  });
};

export const buildAttachments = async (documents: Record<string, FileList | undefined | any>) => {
  const attachments = [];

  for (const key of Object.keys(documents)) {
    const file = documents?.[key]?.[0];
    if (file && !file?.is_uploaded) {
      const base64_data = await fileToBase64(file);
      const base64String = base64_data?.split(",")[1];

      attachments.push({
        file_name: file.name,
        file_type: file.type,
        file_key: key,
        base64_data: base64String,
      });
    }
  }
  return attachments;
};

export const buildDocumentsFromAttachments = (attachments: IAttachment[]) => {
  const documents: { [key: string]: unknown } = {};

  attachments?.map((attachment: IAttachment) => {
    documents[attachment?.file_key] = [{ ...attachment, is_uploaded: true }];
  });

  return documents;
};

export const downloadBase64File = ({ base64_data, file_name, file_type }: { base64_data: string; file_name: string; file_type: string }) => {
  const linkSource = `data:${file_type};base64,${base64_data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = file_name;
  downloadLink.click();
};

export const openBase64File = ({ base64_data, file_name, file_type }: { base64_data: string; file_name: string; file_type: string }) => {
  const linkSource = `data:${file_type};base64,${base64_data}`;
  const downloadLink = document.createElement("a");

  // Optional: open in new tab
  const newTab = window.open();
  if (newTab) {
    newTab.document.write(`<iframe src="${linkSource}" frameborder="0" style="width:100%;height:100%;"></iframe>`);
  } else {
    // Fallback: trigger download
    downloadLink.href = linkSource;
    downloadLink.download = file_name;
    downloadLink.click();
  }
};
