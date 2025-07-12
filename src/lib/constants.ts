export const ROUTES = {
  C_OVERVIEW: "/overview",
  C_REGISTER_DEPOSITOR: "/register-depositor",
  C_PENDING: "/approval-pending",
  LOGIN: "/login",
  E_OVERVIEW: "/e-overview",
};

export const HIDE_SIDEBAR_ROUTES = [ROUTES?.LOGIN];

export type PANFourthChar = "P" | "C" | "F" | "A" | "T" | "B" | "G" | "L" | "H" | "J";

export const partyTypeMapping: Record<
  PANFourthChar,
  {
    partyType: string[];
    subPartyType: string[];
    documents: string[];
  }
> = {
  P: {
    partyType: ["Select", "Individual/Proprietorship"],
    subPartyType: ["Select", "Farmer", "Individual", "Proprietorship"],
    documents: ["PAN", "Aadhaar", "Voter ID"],
  },
  F: {
    partyType: ["Select", "Partnership/Limited Liability Partnership (LLP)"],
    subPartyType: ["Select", "Partnership/Limited Liability Partnership (LLP)"],
    documents: ["Copy of the Partnership Deed"],
  },
  C: {
    partyType: ["Select", "Company/PSU"],
    subPartyType: [
      "Select",
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
    subPartyType: ["Select", "Customs", "Railways", "Election Commission of India", "Other Central Government Parties", "Other State Government Parties"],
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
      "Select",
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
