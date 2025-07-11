import type z from "zod";
import type { loginSchema, registerDepositorFormSchema } from "./schema";

export type DocumentFormValues = z.infer<typeof registerDepositorFormSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

export interface ICustomerTable {
  id: number;
  companyName: string;
  entityType: string;
  email: string;
  applicationDate: string;
  status: string;
  customerCode: string;
  phone: string;
}
