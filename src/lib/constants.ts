import type { IStateObject, IValueLabel } from "./types";

export const ROUTES = {
  C_OVERVIEW: "/c/overview",
  C_REGISTER_DEPOSITOR: "/c/register-depositor",
  C_VIEW: "/view",

  E_OVERVIEW: "/e/overview",
  E_REGISTER_DEPOSITOR: "/e/register-depositor",
  E_VIEW: "/e/view",
  E_PENDING: "/e/approval-pending",

  LOGIN: "/login",
};

export const API_ENDPOINTS = {
  REGISTER_DEPOSITOR: "/save_mdm_data",
  VIEW_DEPOSITOR: "/get_mdm_data",
  LIST_DEPOSITOR: "/list_mdm_data",
  WAREHOUSE_STATES_LIST: "/get_ro_states",
  WAREHOUSE_NAME_LIST: "/get_plant_details",
  // CO_STATES_LIST: "/get_co_details",
  // WO_STATES_LIST: "/get_warehouse_states",
  // WO_NAMES_LIST: "/get_warehouse_names_by_state",
};

// ist_mdm_data?action_type=9876543210&action_for=CO&page=1&limit=10

export const HIDE_SIDEBAR_ROUTES = [ROUTES?.LOGIN];

export type PANFourthChar = "P" | "C" | "F" | "A" | "T" | "B" | "G" | "L" | "H" | "J";

export const defaultPartyTypeMapping: {
  partyType: string[];
  subPartyType: string[];
  documents: string[];
} = {
  partyType: ["Individual", "Govt Organization"],
  subPartyType: ["Customs", "Railways", "Election Commission of India"],
  documents: [],
};

export const partyTypeMapping: Record<
  PANFourthChar,
  {
    partyType: string[];
    subPartyType: string[];
    documents: string[];
  }
> = {
  P: {
    partyType: ["Individual/Proprietorship"],
    subPartyType: ["Farmer", "Individual", "Proprietorship"],
    documents: ["PAN", "Aadhaar", "Voter ID"],
  },
  F: {
    partyType: ["Partnership/Limited Liability Partnership (LLP)"],
    subPartyType: ["Partnership/Limited Liability Partnership (LLP)"],
    documents: ["Copy of the Partnership Deed"],
  },
  C: {
    partyType: ["Company/PSU"],
    subPartyType: [
      "Food Corporation of India (FCI)",
      "Cotton Corporation of India (CCI)",
      "State Civil Supply Corporation (SCSC)",
      "Central PSU",
      "State PSU",
      "Banking & Financial Institutions- Central Govt.",
      "Banking & Financial Institutions- Private",
      "Other Private Companies",
    ],
    documents: ["Letter of Authorization", "Office ID Card of the Authorized Person", "PAN", "Aadhaar", "Voter ID"],
  },
  G: {
    partyType: ["Govt Organization"],
    subPartyType: ["Customs", "Railways", "Election Commission of India", "Other Central Government Parties", "Other State Government Parties"],
    documents: ["Office ID Card of the Authorized Person", "PAN", "Aadhaar", "Voter ID"],
  },
  H: {
    partyType: ["HUF"],
    subPartyType: ["HUF"],
    documents: ["PAN Card", "Official ID Card"],
  },
  A: {
    partyType: ["Association of Persons (AOP)"],
    subPartyType: [
      "NAFED",
      "NCCF",
      "CMSS",
      "Other Central Govt. Cooperative Societies",
      "Other State Govt. Cooperative Societies",
      "Other Private Cooperative Societies",
      "Banking & Financial Institutions- Co-operative",
      "Other Central Govt. AOP's",
      "Other State Govt. AOP's",
      "Other Private AOP's",
    ],
    documents: ["Office ID Card of the Authorized Person", "PAN", "Aadhaar", "GST", "TAN"],
  },
  B: {
    partyType: ["Body of Individual (BOI)"],
    subPartyType: ["Select", "Other Central Govt. BOI", "Other State Govt. BOI", "Other Private BOI"],
    documents: ["Office ID Card of the Authorized Person", "PAN", "Aadhaar", "GST", "TAN"],
  },
  T: {
    partyType: ["Trust"],
    subPartyType: ["Select", "Other Central Govt. Trust", "Other State Govt. Trust", "Other Private Trust"],
    documents: ["Office ID Card of the Authorized Person", "PAN", "Aadhaar", "GST", "TAN"],
  },
  L: {
    partyType: ["Local Authority"],
    subPartyType: ["Select", "Other Central Govt. Local Authority", "Other State Govt. Local Authority"],
    documents: ["Office ID Card of the Authorized Person", "PAN", "Aadhaar", "GST", "TAN"],
  },
  J: {
    partyType: ["Artificial Judicial Person"],
    subPartyType: ["Select", "Other Central Govt.", "Other State Govt.", "Other PRIVATE"],
    documents: ["Office ID Card of the Authorized Person", "PAN", "Aadhaar", "GST", "TAN"],
  },
};

export const STATE_OPTIONS: IValueLabel[] = [
  { label: "Jammu & Kashmir", value: 1 },
  { label: "Himachal Pradesh", value: 2 },
  { label: "Punjab", value: 3 },
  { label: "Chandigarh", value: 4 },
  { label: "Uttarakhand", value: 5 },
  { label: "Haryana", value: 6 },
  { label: "Delhi", value: 7 },
  { label: "Rajasthan", value: 8 },
  { label: "Uttar Pradesh", value: 9 },
  { label: "Bihar", value: 10 },
  { label: "Sikkim", value: 11 },
  { label: "Arunachal Pradesh", value: 12 },
  { label: "Nagaland", value: 13 },
  { label: "Manipur", value: 14 },
  { label: "Mizoram", value: 15 },
  { label: "Tripura", value: 16 },
  { label: "Meghalaya", value: 17 },
  { label: "Assam", value: 18 },
  { label: "West Bengal", value: 19 },
  { label: "Jharkhand", value: 20 },
  { label: "Odisha", value: 21 },
  { label: "Chhattisgarh", value: 22 },
  { label: "Madhya Pradesh", value: 23 },
  { label: "Gujarat", value: 24 },
  { label: "Daman & Diu", value: 25 },
  { label: "Dadra & Nagar Haveli", value: 26 },
  { label: "Maharashtra", value: 27 },
  { label: "Andhra Pradesh (Old)", value: 28 },
  { label: "Karnataka", value: 29 },
  { label: "Goa", value: 30 },
  { label: "Lakshadweep", value: 31 },
  { label: "Kerala", value: 32 },
  { label: "Tamil Nadu", value: 33 },
  { label: "Puducherry", value: 34 },
  { label: "Andaman & Nicobar Islands", value: 35 },
  { label: "Telangana", value: 36 },
  { label: "Andhra Pradesh (Newly Added)", value: 37 },
  { label: "Ladakh (Newly Added)", value: 38 },
  { label: "Others Territory", value: 97 },
  { label: "Center Jurisdiction", value: 99 },
];

export const STATE_PINCODE_OPTIONS: IStateObject[] = [
  {
    label: "Jammu & Kashmir",
    value: 1,
    minPincode: 180000,
    maxPincode: 194999,
  },
  {
    label: "Himachal Pradesh",
    value: 2,
    minPincode: 171000,
    maxPincode: 177999,
  },
  {
    label: "Punjab",
    value: 3,
    minPincode: 140000,
    maxPincode: 160999,
  },
  {
    label: "Chandigarh",
    value: 4,
    minPincode: 160000,
    maxPincode: 160999,
  },
  {
    label: "Uttarakhand",
    value: 5,
    minPincode: 244000,
    maxPincode: 263999,
  },
  {
    label: "Haryana",
    value: 6,
    minPincode: 121000,
    maxPincode: 136999,
  },
  {
    label: "Delhi",
    value: 7,
    minPincode: 110000,
    maxPincode: 110999,
  },
  {
    label: "Rajasthan",
    value: 8,
    minPincode: 301000,
    maxPincode: 345999,
  },
  {
    label: "Uttar Pradesh",
    value: 9,
    minPincode: 201000,
    maxPincode: 285999,
  },
  {
    label: "Bihar",
    value: 10,
    minPincode: 800000,
    maxPincode: 855999,
  },
  {
    label: "Sikkim",
    value: 11,
    minPincode: 737000,
    maxPincode: 737999,
  },
  {
    label: "Arunachal Pradesh",
    value: 12,
    minPincode: 790000,
    maxPincode: 792999,
  },
  {
    label: "Nagaland",
    value: 13,
    minPincode: 797000,
    maxPincode: 798999,
  },
  {
    label: "Manipur",
    value: 14,
    minPincode: 795000,
    maxPincode: 795999,
  },
  {
    label: "Mizoram",
    value: 15,
    minPincode: 796000,
    maxPincode: 796999,
  },
  {
    label: "Tripura",
    value: 16,
    minPincode: 799000,
    maxPincode: 799999,
  },
  {
    label: "Meghalaya",
    value: 17,
    minPincode: 793000,
    maxPincode: 794999,
  },
  {
    label: "Assam",
    value: 18,
    minPincode: 781000,
    maxPincode: 788999,
  },
  {
    label: "West Bengal",
    value: 19,
    minPincode: 700000,
    maxPincode: 743999,
  },
  {
    label: "Jharkhand",
    value: 20,
    minPincode: 813000,
    maxPincode: 835999,
  },
  {
    label: "Odisha",
    value: 21,
    minPincode: 751000,
    maxPincode: 770999,
  },
  {
    label: "Chhattisgarh",
    value: 22,
    minPincode: 490000,
    maxPincode: 497999,
  },
  {
    label: "Madhya Pradesh",
    value: 23,
    minPincode: 450000,
    maxPincode: 488999,
  },
  {
    label: "Gujarat",
    value: 24,
    minPincode: 360000,
    maxPincode: 396999,
  },
  {
    label: "Daman & Diu",
    value: 25,
    maxPincode: 999,
  },
  {
    label: "Dadra & Nagar Haveli",
    value: 26,
    minPincode: 396000,
    maxPincode: 396999,
  },
  {
    label: "Maharashtra",
    value: 27,
    minPincode: 400000,
    maxPincode: 445999,
  },
  {
    label: "Andhra Pradesh (Old)",
    value: 28,
  },
  {
    label: "Karnataka",
    value: 29,
    minPincode: 560000,
    maxPincode: 591999,
  },
  {
    label: "Goa",
    value: 30,
    minPincode: 403000,
    maxPincode: 403999,
  },
  {
    label: "Lakshadweep",
    value: 31,
    minPincode: 682000,
    maxPincode: 682999,
  },
  {
    label: "Kerala",
    value: 32,
    minPincode: 670000,
    maxPincode: 695999,
  },
  {
    label: "Tamil Nadu",
    value: 33,
    minPincode: 600000,
    maxPincode: 643999,
  },
  {
    label: "Puducherry",
    value: 34,
  },
  {
    label: "Andaman & Nicobar Islands",
    value: 35,
    minPincode: 744000,
    maxPincode: 744999,
  },
  {
    label: "Telangana",
    value: 36,
    minPincode: 500000,
    maxPincode: 509999,
  },
  {
    label: "Andhra Pradesh (Newly Added)",
    value: 37,
    minPincode: 500000,
    maxPincode: 535999,
  },
  {
    label: "Ladakh (Newly Added)",
    value: 38,
  },
  {
    label: "Others Territory",
    value: 97,
  },
  {
    label: "Center Jurisdiction",
    value: 99,
  },
];

export const STATE_34_PINCODE_RANGE = [
  [533000, 533999],
  [605000, 605999],
  [607000, 607999],
  [609000, 609999],
];

export const REGISTER_DEFAULT_VALUES = {
  panAvailable: "Yes",
  panNumber: "",
  tanNumber: "",
  gstNumber: "",
  aadhaarNumber: "",
  optionalFeatures: {
    forwarder: false,
    consolid: false,
    shippingLine: false,
    transporter: false,
    rent: false,
    auction: false,
  },
  isExporterImporter: "No",
  isCHA: "No",
  prefferedLocationDetails: {
    warehouseState: "",
    customerBranchName: "",
    warehouseName: "",
  },
  contactDetails: [{ contactNo: "234234234", email: "t@t.com", contactPerson: "Test", isPrimary: true }],
  bankDetails: [{ bankName: "asdfa", accountHolderName: "asdfgfds", ifscCode: "12341", accountNo: "123432", country: "IN" }],
};

export const STATIC_MOBILE_NO = "9876543210";
export const STATIC_EMP_NO = "200015";
export const STATIC_PLANT_NO = "2900";

export const STATUS_MATRIX = {
  5: "Draft",
  10: "Submitted",
  20: "Customer Created",
  50: "Reject",
};

export const WAREHOUSE_TYPES = [
  { value: "RO", label: "RO" },
  { value: "CO", label: "CO" },
  { value: "WO", label: "Warehouse" },
];
