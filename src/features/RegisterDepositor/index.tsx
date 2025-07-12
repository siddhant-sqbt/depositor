import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DocumentRegistration from "./components/DocumentRegistration";
import type { DocumentFormValues } from "@/lib/types";
import { registerDepositorFormSchema } from "@/lib/schema";

import PartyRegistrationSection from "./components/PartyRegistrationSection";
import ExporterImporterSection from "./components/ExporterImporterSection";
import OptionalFeaturesSection from "./components/OptionalFeaturesSection";
import ContactDetailsSection from "./components/ContactDetailsSection";
import BankDetailsSection from "./components/BankDetailsSection";
import PrefferedLocationSection from "./components/PrefferedLocationSection";
import { STATE_PINCODE_OPTIONS } from "@/lib/constants";
import { DocumentUploadTable } from "./components/DocumentsSection";
import { toast } from "sonner";

const RegisterDepositorForm = () => {
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(registerDepositorFormSchema),
    defaultValues: {
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
      prefferedLocationDetails: {
        warehouseState: "",
        customerBranchName: "",
        warehouseName: "",
      },
      contactDetails: [{ contactNo: "", email: "", contactPerson: "", isPrimary: true }],
      bankDetails: [{ bankName: "", accountHolderName: "", ifscCode: "", accountNo: "", country: "IN" }],
    },
  });

  const selectedState = form.watch("state") || "";

  const onSubmit = (data: DocumentFormValues) => {
    console.log("form submitted");
    // toast("Aadhar card, PAN Card is required");

    console.log("data: ", data);

    // Check PAN Card validation
    if (data.panNumber && !data.documents.panCard) {
      toast("PAN Card document is required when PAN number is provided");
    }

    // Check Aadhaar Card validation
    if (data.aadhaarNumber && !data.documents.aadhaarCard) {
      toast("Aadhaar Card document is required when Aadhaar number is provided");
    }

    // Check GST Certificate validation
    if (data.gstNumber && !data.documents.gstCertificate) {
      toast("GST Certificate document is required when GST number is provided");
    }

    // Check TAN Document validation
    if (data.tanNumber && data.documents.tanDocument?.length === 0) {
      toast("TAN Document is required when TAN number is provided");
    }

    // Clear previous errors
    form.clearErrors("pinNumber");

    // Validate pincode
    const pincode = Number(data.pinNumber);
    const selectedStateObj = STATE_PINCODE_OPTIONS.find((s) => s.value === Number(selectedState));

    if (!selectedStateObj) {
      form.setError("pinNumber", {
        type: "manual",
        message: "Please select a state first",
      });
      return;
    }

    const min = selectedStateObj.minPincode ?? 0;
    const max = selectedStateObj.maxPincode ?? 999999;

    if (pincode < min || pincode > max) {
      form.setError("pinNumber", {
        type: "manual",
        message: `Pincode must be between ${min} and ${max} for the selected state`,
      });
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto p-4 w-[inherit]">
        <div>
          <h1 className="text-3xl text-center font-semibold mb-4">New Depositor Registration</h1>
        </div>
        <Separator className="mb-4" />
        <div className="flex flex-col gap-4">
          <DocumentRegistration form={form} />
          <PartyRegistrationSection form={form} />
          <PrefferedLocationSection form={form} />
          <ExporterImporterSection form={form} />
          <OptionalFeaturesSection form={form} />
          <ContactDetailsSection form={form} />
          <BankDetailsSection form={form} />
          <DocumentUploadTable form={form} />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterDepositorForm;
