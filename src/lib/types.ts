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

export interface IValueLabel {
  value: number;
  label: string;
}

export interface IStateObject {
  value: number;
  label: string;
  minPincode?: number;
  maxPincode?: number;
}

export interface IDistrict {
  id: number;
  long_desc: string;
  short_desc: string;
}
