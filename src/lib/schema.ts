import { toast } from "sonner";
import z from "zod";

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
      .refine((val) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val), { message: "Invalid GST Number" }),
    aadhaarNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^[0-9]{12}$/.test(val), { message: "Invalid Aadhaar Number" }),

    partyType: z.string().min(1, "Party Type is required"),
    subPartyType: z.string().min(1, "Sub Party Type is required"),
    pinNumber: z.string().optional(),
    name1: z.string().max(40).min(1, "Name is required"),
    name2: z.string().max(35).optional(),
    name3: z.string().max(80).optional(),
    address1: z.string().min(1, "Address Line 1 is required"),
    address2: z.string().optional(),
    address3: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
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
        isPrimary: z.boolean().optional(),
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

    if (requirements?.aadharRequired && (!data?.aadhaarNumber || data?.aadhaarNumber?.trim() === "")) {
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

    if (data?.isExporterImporter && (!data?.iecNumber || data?.iecNumber?.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "IEC number is required",
        path: ["iecNumber"],
      });
    }

    if (data?.isCHA && (!data?.chaLicenseNumber || data?.chaLicenseNumber?.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CHA License number is required",
        path: ["chaLicenseNumber"],
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

    // Check Aadhaar Card validation
    if (data.aadhaarNumber && data?.documents?.aadhaarCard?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Aadhaar Card document is required when Aadhaar number is provided",
        path: ["documents.aadhaarCard"],
      });
    }

    // Check GST Certificate validation
    // if (data?.gstNumber && data?.documents?.gstCertificate?.length === 0) {
    //   toast.error("GST Certificate document is required when GST number is provided");
    // }

    // // Check TAN Document validation
    // if (data.tanNumber && data?.documents?.tanDocument?.length === 0) {
    //   toast.error("TAN Document is required when TAN number is provided");
    // }
  });
// .refine(
//   (data) => {
//     // Skip validation if PAN is not available
//     if (data.panAvailable === "no") {
//       return true;
//     }

//     // Skip validation if PAN number is not provided
//     if (!data.panNumber || data.panNumber.length < 4) {
//       return true;
//     }

//     // Get the 4th character of PAN
//     const pan4thDigit = data.panNumber[3].toUpperCase();

//     // Define validation rules based on PAN 4th digit
//     const validationRules = {
//       P: { panRequired: true, gstRequired: false, tanRequired: false }, // ZIND
//       F: { panRequired: true, gstRequired: false, tanRequired: false }, // ZLLP
//       C: { panRequired: true, gstRequired: true, tanRequired: true }, // ZCOM
//       G: { panRequired: false, gstRequired: false, tanRequired: false }, // ZGOV
//       A: { panRequired: true, gstRequired: true, tanRequired: true }, // ZAOP
//       B: { panRequired: true, gstRequired: true, tanRequired: true }, // ZBOI
//       T: { panRequired: true, gstRequired: true, tanRequired: true }, // ZTRU
//       L: { panRequired: true, gstRequired: true, tanRequired: true }, // ZLOC
//       J: { panRequired: true, gstRequired: true, tanRequired: true }, // ZART
//       H: { panRequired: true, gstRequired: false, tanRequired: false }, // Others
//     };

//     type PanFourthChar = keyof typeof validationRules;

//     const rule = validationRules[pan4thDigit as PanFourthChar];

//     // If no specific rule found, use default validation
//     if (!rule) {
//       return true;
//     }

//     // Validate GST requirement
//     if (rule.gstRequired && (!data.gstNumber || data.gstNumber.trim() === "")) {
//       return false;
//     }

//     // Validate TAN requirement
//     if (rule.tanRequired && (!data.tanNumber || data.tanNumber.trim() === "")) {
//       return false;
//     }

//     return true;
//   },
//   {
//     message: "Required fields are missing based on PAN type",
//     path: ["panNumber"], // This will show the error on the panNumber field
//   }
// )
// .refine(
//   (data) => {
//     if (data.panAvailable === "yes" && data.panNumber && data.panNumber.length >= 4) {
//       const pan4thDigit = data.panNumber[3].toUpperCase();
//       const gstRequiredTypes = ["C", "A", "B", "T", "L", "J"];

//       if (gstRequiredTypes.includes(pan4thDigit) && (!data.gstNumber || data.gstNumber.trim() === "")) {
//         return false;
//       }
//     }
//     return true;
//   },
//   {
//     message: "GST Number is required for this PAN type",
//     path: ["gstNumber"],
//   }
// )
// .refine(
//   (data) => {
//     // Custom error messages for TAN
//     if (data.panAvailable === "yes" && data.panNumber && data.panNumber.length >= 4) {
//       const pan4thDigit = data.panNumber[3].toUpperCase();
//       const tanRequiredTypes = ["C", "A", "B", "T", "L", "J"];

//       if (tanRequiredTypes.includes(pan4thDigit) && (!data.tanNumber || data.tanNumber.trim() === "")) {
//         return false;
//       }
//     }
//     return true;
//   },
//   {
//     message: "TAN Number is required for this PAN type",
//     path: ["tanNumber"],
//   }
// );

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
