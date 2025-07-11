import z from "zod";

export const registerDepositorFormSchema = z.object({
  panAvailable: z.enum(["Yes", "No"], { message: "Select PAN availability" }),
  panNumber: z.string().optional(),
  tanNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  aadhaarNumber: z.string().optional(),

  partyType: z.string().min(1, "Party Type is required"),
  subPartyType: z.string().min(1, "Sub Party Type is required"),
  pinNumber: z.string().optional(),
  name1: z.string().optional(),
  name2: z.string().optional(),
  name3: z.string().optional(),
  address1: z.string().min(1, "Address Line 1 is required"),
  address2: z.string().optional(),
  address3: z.string().optional(),
  city: z.string().optional(),
  state: z.string().min(1, "State is required"),
  district: z.string().optional(),

  isExporterImporter: z.enum(["Yes", "No"], { message: "Please choose Exporter/Importer option" }),
  iecNumber: z.string().optional(),

  isCHA: z.enum(["Yes", "No"], { message: "Please choose CHA option" }),
  chaLicenseNumber: z.string().optional(),

  optionalFeatures: z.object({
    forwarder: z.boolean().optional(),
    consolid: z.boolean().optional(),
    shippingLine: z.boolean().optional(),
    transporter: z.boolean().optional(),
    rent: z.boolean().optional(),
    auction: z.boolean().optional(),
  }),

  prefferedLocationDetails: z.object({
    warehouseState: z.string().min(1, "Contact No is required"),
    warehouseName: z.string().min(1, "Warehouse Name is required"),
    customerBranchName: z.string().min(1, "Customer Branch is required"),
  }),

  contactDetails: z.array(
    z.object({
      contactNo: z.string().min(1, "Contact No is required"),
      email: z.string().email("Invalid email"),
      contactPerson: z.string().min(1, "Contact Person is required"),
      isPrimary: z.boolean(),
    })
  ),

  bankDetails: z.array(
    z.object({
      bankName: z.string().min(1, "Bank Name is required"),
      accountHolderName: z.string().min(1, "Account Holder Name is required"),
      ifscCode: z.string().min(1, "IFSC is required"),
      accountNo: z.string().min(1, "Account Number is required"),
      country: z.string().min(1, "Country is required"),
    })
  ),
});

export const loginSchema = z.object({
  userRole: z.enum(["customer", "employee"], { message: "Select User Role" }),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
