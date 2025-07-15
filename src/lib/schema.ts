import z from "zod";

export const registerDepositorFormSchema = z
  .object({
    panAvailable: z.enum(["Yes", "No"], { message: "Select PAN availability" }),
    panNumber: z.string().optional(),
    tanNumber: z.string().optional(),
    gstNumber: z.string().optional(),
    aadhaarNumber: z.string().optional(),

    partyType: z.string().min(1, "Party Type is required"),
    subPartyType: z.string().min(1, "Sub Party Type is required"),
    pinNumber: z.string().optional(),
    name1: z.string().max(40).optional(),
    name2: z.string().max(35).optional(),
    name3: z.string().max(80).optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    address3: z.string().optional(),
    city: z.string().optional(),
    state: z.string().min(1, "State is required").optional(),
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
      warehouseState: z.string().optional(),
      warehouseName: z.string().optional(),
      customerBranchName: z.string().optional(),
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
    documents: z.object({
      panCard: z.any().optional(),
      aadhaarCard: z.any().optional(),
      gstCertificate: z.any().optional(),
      tanDocument: z.any().optional(),
      officeIdCard: z.any().optional(),
      letter: z.any().optional(),
      specimenSignature: z.any().optional(),
      other: z.any().optional(),
    }),
  })
  .refine(
    (data) => {
      // Skip validation if PAN is not available
      if (data.panAvailable === "No") {
        return true;
      }

      // Skip validation if PAN number is not provided
      if (!data.panNumber || data.panNumber.length < 4) {
        return true;
      }

      // Get the 4th character of PAN
      const pan4thDigit = data.panNumber[3].toUpperCase();

      // Define validation rules based on PAN 4th digit
      const validationRules = {
        P: { panRequired: true, gstRequired: false, tanRequired: false }, // ZIND
        F: { panRequired: true, gstRequired: false, tanRequired: false }, // ZLLP
        C: { panRequired: true, gstRequired: true, tanRequired: true }, // ZCOM
        G: { panRequired: false, gstRequired: false, tanRequired: false }, // ZGOV
        A: { panRequired: true, gstRequired: true, tanRequired: true }, // ZAOP
        B: { panRequired: true, gstRequired: true, tanRequired: true }, // ZBOI
        T: { panRequired: true, gstRequired: true, tanRequired: true }, // ZTRU
        L: { panRequired: true, gstRequired: true, tanRequired: true }, // ZLOC
        J: { panRequired: true, gstRequired: true, tanRequired: true }, // ZART
        H: { panRequired: true, gstRequired: false, tanRequired: false }, // Others
      };

      type PanFourthChar = keyof typeof validationRules;

      const rule = validationRules[pan4thDigit as PanFourthChar];

      // If no specific rule found, use default validation
      if (!rule) {
        return true;
      }

      // Validate GST requirement
      if (rule.gstRequired && (!data.gstNumber || data.gstNumber.trim() === "")) {
        return false;
      }

      // Validate TAN requirement
      if (rule.tanRequired && (!data.tanNumber || data.tanNumber.trim() === "")) {
        return false;
      }

      return true;
    },
    {
      message: "Required fields are missing based on PAN type",
      path: ["panNumber"], // This will show the error on the panNumber field
    }
  )
  .refine(
    (data) => {
      if (data.panAvailable === "Yes" && data.panNumber && data.panNumber.length >= 4) {
        const pan4thDigit = data.panNumber[3].toUpperCase();
        const gstRequiredTypes = ["C", "A", "B", "T", "L", "J"];

        if (gstRequiredTypes.includes(pan4thDigit) && (!data.gstNumber || data.gstNumber.trim() === "")) {
          return false;
        }
      }
      return true;
    },
    {
      message: "GST Number is required for this PAN type",
      path: ["gstNumber"],
    }
  )
  .refine(
    (data) => {
      // Custom error messages for TAN
      if (data.panAvailable === "Yes" && data.panNumber && data.panNumber.length >= 4) {
        const pan4thDigit = data.panNumber[3].toUpperCase();
        const tanRequiredTypes = ["C", "A", "B", "T", "L", "J"];

        if (tanRequiredTypes.includes(pan4thDigit) && (!data.tanNumber || data.tanNumber.trim() === "")) {
          return false;
        }
      }
      return true;
    },
    {
      message: "TAN Number is required for this PAN type",
      path: ["tanNumber"],
    }
  );

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
