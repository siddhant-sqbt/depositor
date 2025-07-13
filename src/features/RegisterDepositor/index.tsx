import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DocumentRegistration from "./components/DocumentRegistration";
import type { DocumentFormValues, IRegisterDepositorFormProps } from "@/lib/types";
import { registerDepositorFormSchema } from "@/lib/schema";

import PartyRegistrationSection from "./components/PartyRegistrationSection";
import ExporterImporterSection from "./components/ExporterImporterSection";
import OptionalFeaturesSection from "./components/OptionalFeaturesSection";
import ContactDetailsSection from "./components/ContactDetailsSection";
import BankDetailsSection from "./components/BankDetailsSection";
import PrefferedLocationSection from "./components/PrefferedLocationSection";
import { DocumentUploadTable } from "./components/DocumentsSection";
import { getRegisterDepositorDetails, postRegisterDepositor } from "@/lib/apis/apis";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

const RegisterDepositorForm: React.FC<IRegisterDepositorFormProps> = ({ viewOnly, reqNumber }) => {
  const navigate = useNavigate();
  // const { data: fetchedData, isLoading: isFetchingData } = useQuery({
  //   queryKey: ["getDepositorDetails", reqNumber],
  //   queryFn: () => reqNumber && getRegisterDepositorDetails(reqNumber),
  //   enabled: viewOnly && !!reqNumber,
  // });

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(registerDepositorFormSchema),
    defaultValues: async () => {
      if (viewOnly && reqNumber) {
        const data = await getRegisterDepositorDetails(reqNumber);
        return data; // prefilled values from API
      } else {
        return {
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
      }
    },
  });

  // console.log("values 12: ", form.getValues()?.["address1"], form.getValues()?.["panNumber"]);

  // useEffect(() => {
  //   if (viewOnly && reqNumber && fetchedData) {
  //     // console.log("fetchedData", fetchedData);
  //     form.reset(fetchedData);
  //   }
  // }, [viewOnly, reqNumber, fetchedData, form]);

  // const selectedState = form.watch("state") || "";

  // const validatePincode = (data: DocumentFormValues) => {
  //   // Clear previous errors
  //   form.clearErrors("pinNumber");

  //   // Validate pincode
  //   const pincode = Number(data.pinNumber);
  //   const selectedStateObj = STATE_PINCODE_OPTIONS.find((s) => s.value === Number(selectedState));

  //   if (!selectedStateObj) {
  //     form.setError("pinNumber", {
  //       type: "manual",
  //       message: "Please select a state first",
  //     });
  //     return;
  //   }

  //   const min = selectedStateObj.minPincode ?? 0;
  //   const max = selectedStateObj.maxPincode ?? 999999;

  //   if (pincode < min || pincode > max) {
  //     form.setError("pinNumber", {
  //       type: "manual",
  //       message: `Pincode must be between ${min} and ${max} for the selected state`,
  //     });
  //     return;
  //   }
  // };

  // const validateDocuments = (data: DocumentFormValues) => {
  //   // Check PAN Card validation
  //   if (data.panNumber && data?.documents?.panCard?.length === 0) {
  //     toast("PAN Card document is required when PAN number is provided");
  //   }

  //   // Check Aadhaar Card validation
  //   if (data.aadhaarNumber && data?.documents?.aadhaarCard?.length === 0) {
  //     toast("Aadhaar Card document is required when Aadhaar number is provided");
  //   }

  //   // Check GST Certificate validation
  //   if (data?.gstNumber && data?.documents?.gstCertificate?.length === 0) {
  //     toast("GST Certificate document is required when GST number is provided");
  //   }

  //   // Check TAN Document validation
  //   if (data.tanNumber && data?.documents?.tanDocument?.length === 0) {
  //     toast("TAN Document is required when TAN number is provided");
  //   }
  // };

  const { mutate: mutateRegisterDepositor, isPending } = useMutation({
    mutationFn: (data: DocumentFormValues) => postRegisterDepositor(data),
    onSuccess: (res) => {
      console.log("res", res);
      toast(`Depositor registered successfully! ${res?.req_number}`);
      navigate(ROUTES?.C_OVERVIEW);
    },
    onError: () => {
      toast("Failed to register depositor");
    },
  });

  useEffect(() => {
    console.log("isLoading: ", isPending);
  }, [isPending]);

  // if (viewOnly) {
  //   return <div>Loading depositor details...</div>;
  // }

  const onSubmit = async (data: DocumentFormValues) => {
    console.log("form submitted data: ", data);
    // validatePincode(data);
    // validateDocuments(data);
    try {
      const response = mutateRegisterDepositor(data);
      console.log("response: ", response);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  if (isPending) {
    return <>LOADING</>;
  }

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
          <DocumentUploadTable />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterDepositorForm;
