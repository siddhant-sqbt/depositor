import type z from "zod";
import type { loginSchema, phoneLoginSchema, registerDepositorFormSchema } from "./schema";

export type DocumentFormValues = z.infer<typeof registerDepositorFormSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

// export interface ICustomerTable {
//   id: number;
//   companyName: string;
//   entityType: string;
//   email: string;
//   applicationDate: string;
//   status: string;
//   customerCode: string;
//   phone: string;
// }

export interface IValueLabel {
  value: number;
  label: string;
}

export interface IWarehouseLabel {
  value: string;
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

export interface IRegisterDepositorFormProps {
  viewOnly?: boolean;
  reqNumber?: string; // unique id to fetch depositor
}

export interface ITableData {
  created_on: string;
  first_name: string;
  last_name: string;
  mob_number: string;
  pending_with: string;
  req_number: string;
  status: "5" | "10" | "20" | "50";
  status_text: string;
  party_type: string;
  sub_party_type: string;
}

export interface IAPIErrorResponse {
  message: string;
}

export interface IWarehouseNameOption {
  plant: string;
  profit_center_description: string;
}

export interface IAttachment {
  file_name: string;
  file_type: string;
  file_key: string;
  is_uploaded?: string;
}

export interface IVerifyOTPPayload {
  otp: string;
  mob_number: string;
}

export type IDocumentKeys =
  | "other"
  | "letter"
  | "panCard"
  | "aadhaarCard"
  | "tanDocument"
  | "officeIdCard"
  | "gstCertificate"
  | "specimenSignature"
  | "cancelledCheque"
  | "iecDocument"
  | "chaLicense";

export type PhoneLoginFormValues = z.infer<typeof phoneLoginSchema>;
