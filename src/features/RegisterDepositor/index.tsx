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

  const onSubmit = (data: DocumentFormValues) => {
    console.log("Form Data", data);
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
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterDepositorForm;
