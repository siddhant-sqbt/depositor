import { toast } from "sonner";
import z from "zod";
import { isPincodeInState34, STATE_PINCODE_OPTIONS } from "./constants";

export const registerDepositorFormSchema = z
  .object({
    panAvailable: z.enum(["yes", "no"], { message: "Select PAN availability" }),
    panNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), { message: "Invalid PAN format" }),
    tanNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^[A-Z]{4}[0-9]{5}[A-Z]$/.test(val), { message: "Invalid TAN format" }),
    gstNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}Z[0-9A-Z]{1}$/.test(val), { message: "Invalid GST Number" }),
    aadhaarNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^[0-9]{12}$/.test(val), { message: "Invalid Aadhaar Number" }),

    partyType: z.string().min(1, "Party Type is required"),
    subPartyType: z.string().min(1, "Sub Party Type is required"),
    name1: z.string().max(40).min(1, "Name is required"),
    name2: z.string().max(35).optional(),
    name3: z.string().max(80).optional(),
    address1: z.string().min(1, "Address Line 1 is required"),
    address2: z.string().optional(),
    address3: z.string().optional(),
    state: z.string().optional(),
    district: z.string().optional(),
    city: z.string().optional(),
    pinNumber: z.string().min(1, "Pincode is required"),

    isExporterImporter: z.enum(["Yes", "No"], { message: "Please choose Exporter/Importer option" }),
    iecNumber: z.string().optional(),

    isCHA: z.enum(["Yes", "No"], { message: "Please choose CHA option" }),
    chaLicenseNumber: z.string().optional(),
    chaValidityDate: z.string().optional(),

    optionalFeatures: z.object({
      forwarder: z.boolean().optional(),
      consolid: z.boolean().optional(),
      shippingLine: z.boolean().optional(),
      transporter: z.boolean().optional(),
      rent: z.boolean().optional(),
      auction: z.boolean().optional(),
    }),

    serviceSecondaryAddress: z.array(
      z.object({
        serviceBranchName: z.string().optional(),
        serviceAddress1: z.string().optional(),
        serviceAddress2: z.string().optional(),
        serviceAddress3: z.string().optional(),
        serviceState: z.string().optional(),
        serviceDistrict: z.string().optional(),
        serviceCity: z.string().optional(),
        servicePincode: z.string().optional(),
        isActive: z.boolean().optional(),
      })
    ),

    representative: z.array(
      z.object({
        repName: z.string().optional(),
        repMobileNo: z.string().optional(),
        repEmail: z.string().optional(),
        repPosition: z.string().optional(),
        repCreationDate: z.string().optional(),
        repIsActivated: z.string().optional(),
        repDeactivateDate: z.string().optional(),
        repOtpVerified: z.string().optional(),
      })
    ),

    prefferedLocationDetails: z.object({
      // warehouseType: z.string().min(1, "warehouse Type is required"),
      warehouseType: z.string().optional(),
      // warehouseState: z.string().min(1, "warehouse State is required"),
      warehouseState: z.string().optional(),
      // warehouseName: z.string().min(1, "warehouse Name is required"),
      warehouseName: z.string().optional(),
      customerBranchName: z.string().optional(),
    }),

    contactDetails: z.array(
      z.object({
        contactNo: z.string().optional(),
        email: z.string().optional(),
        contactPerson: z.string().optional(),
        contactPosition: z.string().optional(),
        isPrimary: z.boolean().optional(),
        primaryEmail: z.boolean().optional(),
        primarySms: z.boolean().optional(),
      })
    ),

    bankDetails: z.array(
      z.object({
        bankName: z.string().optional(),
        accountHolderName: z.string().optional(),
        ifscCode: z.string().optional(),
        accountNo: z.string().optional(),
        country: z.string().optional(),
      })
    ),
    documents: z.object({
      other: z.any().optional(),
      letter: z.any().optional(),
      panCard: z.any().optional(),
      aadhaarCard: z.any().optional(),
      tanDocument: z.any().optional(),
      officeIdCard: z.any().optional(),
      gstCertificate: z.any().optional(),
      specimenSignature: z.any().optional(),
      cancelledCheque: z.any().optional(),
      iecDocument: z.any().optional(),
      chaLicense: z.any().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    const requirements = getFieldRequirements(data.panNumber ?? "");

    if (data.panAvailable === "yes") {
      if (!data.panNumber || data.panNumber.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PAN number is required",
          path: ["panNumber"],
        });
      }
    }

    if ((requirements?.aadharRequired || (data?.panAvailable === "no" && data?.partyType === "Individual")) && (!data?.aadhaarNumber || data?.aadhaarNumber?.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Aadhaar number is required",
        path: ["aadhaarNumber"],
      });
    }
    if (requirements?.tanRequired && (!data?.tanNumber || data?.tanNumber?.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "TAN number is required",
        path: ["tanNumber"],
      });
    }
    if (requirements?.gstRequired && (!data?.gstNumber || data?.gstNumber?.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "GST number is required",
        path: ["gstNumber"],
      });
    }
    if (requirements?.aadharRequired && (!data?.aadhaarNumber || data?.aadhaarNumber?.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Aadhaar number is required",
        path: ["aadhaarNumber"],
      });
    }

    if (data?.isExporterImporter === "Yes") {
      if (!data?.iecNumber || data?.iecNumber?.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "IEC number is required",
          path: ["iecNumber"],
        });
      } else if (data?.documents?.iecDocument?.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "IEC Document is required",
          path: ["documents.iecDocument"],
        });
      }
    }

    if (data?.isCHA === "Yes") {
      if (!data?.chaLicenseNumber || data?.chaLicenseNumber?.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CHA License is required",
          path: ["chaLicenseNumber"],
        });
      } else if (data?.documents?.chaLicense?.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CHA License number is required",
          path: ["documents.chaLicense"],
        });
      }
      if (!data?.chaValidityDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CHA Validity Date is required",
          path: ["chaLicenseNumber"],
        });
      }
    }

    // Check PAN Card validation
    if (data.panNumber && data?.documents?.panCard?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "PAN Card document is required when PAN number is provided",
        path: ["documents.panCard"],
      });
    }

    // Check Aadhaar Card validation
    if (data.aadhaarNumber && data?.documents?.aadhaarCard?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Aadhaar Card document is required when Aadhaar number is provided",
        path: ["documents.aadhaarCard"],
      });
    }

    // Check GST Certificate validation
    if (data?.gstNumber && data?.documents?.gstCertificate?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Aadhaar Card document is required when Aadhaar number is provided",
        path: ["documents.gstCertificate"],
      });
    }

    // Check TAN Document validation
    if (data.tanNumber && data?.documents?.tanDocument?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Aadhaar Card document is required when Aadhaar number is provided",
        path: ["documents.tanDocument"],
      });
    }

    // Check PAN Card validation
    if (data.panNumber && data?.documents?.panCard?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "PAN Card document is required when PAN number is provided",
        path: ["documents.panCard"],
      });
    }

    if (data?.state && !!data?.pinNumber) {
      const pincode = Number(data?.pinNumber);
      if (Number(data?.state) === 34) {
        if (!isPincodeInState34(pincode)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid Pincode",
            path: ["pinNumber"],
          });
        }
      } else {
        const selectedState = STATE_PINCODE_OPTIONS?.find((state) => state.value === Number(data?.state));
        if (selectedState) {
          if (pincode < (selectedState?.minPincode as number) || pincode > (selectedState?.maxPincode as number)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid Pincode",
              path: ["pinNumber"],
            });
          }
        }
      }
    }
  });

// Helper function to get field requirements based on PAN
export const getFieldRequirements = (panNumber: string) => {
  if (!panNumber || panNumber.length < 4) {
    return { panRequired: false, gstRequired: false, tanRequired: false, aadharRequired: false, aadharDisabled: false };
  }

  const pan4thDigit = panNumber[3].toUpperCase();

  type PanFourthChar = keyof typeof rules;

  const rules = {
    P: { panRequired: true, gstRequired: false, tanRequired: false, aadharRequired: true, aadharDisabled: false }, // ZIND
    F: { panRequired: true, gstRequired: false, tanRequired: false, aadharRequired: false, aadharDisabled: true }, // ZLLP
    C: { panRequired: true, gstRequired: true, tanRequired: true, aadharRequired: false, aadharDisabled: true }, // ZCOM
    G: { panRequired: false, gstRequired: false, tanRequired: false, aadharRequired: false, aadharDisabled: true }, // ZGOV
    A: { panRequired: true, gstRequired: true, tanRequired: true, aadharRequired: false, aadharDisabled: true }, // ZAOP
    B: { panRequired: true, gstRequired: true, tanRequired: true, aadharRequired: false, aadharDisabled: true }, // ZBOI
    T: { panRequired: true, gstRequired: true, tanRequired: true, aadharRequired: false, aadharDisabled: true }, // ZTRU
    L: { panRequired: true, gstRequired: true, tanRequired: true, aadharRequired: false, aadharDisabled: true }, // ZLOC
    J: { panRequired: true, gstRequired: true, tanRequired: true, aadharRequired: false, aadharDisabled: true }, // ZART
    H: { panRequired: true, gstRequired: false, tanRequired: false, aadharRequired: false, aadharDisabled: true }, // Others
  };

  return rules[pan4thDigit as PanFourthChar] || { panRequired: false, gstRequired: false, tanRequired: false, aadharRequired: false, aadharDisabled: false };
};

export const loginSchema = z.object({
  userRole: z.enum(["customer", "employee"], { message: "Select User Role" }),
  username: z.string().optional(),
  password: z.string().optional(),
});

export const phoneLoginSchema = z.object({
  userRole: z.enum(["customer", "employee"], {
    message: "Please select a user role",
  }),
  phoneNumber: z.string().min(1, "Phone number is required"),
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});
