import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DocumentRegistration from "./components/DocumentRegistration";
import type { DocumentFormValues, IAPIErrorResponse, IRegisterDepositorFormProps } from "@/lib/types";
import { registerDepositorFormSchema } from "@/lib/schema";

import ExporterImporterSection from "./components/ExporterImporterSection";
import OptionalFeaturesSection from "./components/OptionalFeaturesSection";
import ContactDetailsSection from "./components/ContactDetailsSection";
import BankDetailsSection from "./components/BankDetailsSection";
import PrefferedLocationSection from "./components/PrefferedLocationSection";
import { DocumentUploadTable } from "./components/DocumentsSection";
import { getRegisterDepositorDetails, postApproveForm, postRegisterDepositor, postRejectForm } from "@/lib/apis/apis";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES, STATIC_EMP_NO, STATIC_MOBILE_NO } from "@/lib/constants";
import BasicDetailsSection from "./components/BasicDetailsSection";
import { useState, type BaseSyntheticEvent } from "react";
import type { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

// action_type (number), action_for (C or E)

const RegisterDepositorForm: React.FC<IRegisterDepositorFormProps> = ({ viewOnly, reqNumber }) => {
  const navigate = useNavigate();
  const isEmployee = localStorage?.getItem("ROLE") === "E";
  const [isLoading, setIsLoading] = useState<boolean>(!!viewOnly && !!reqNumber);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(registerDepositorFormSchema),
    defaultValues: async () => {
      if (viewOnly && reqNumber) {
        try {
          setIsLoading(true);
          const fetchedData = await getRegisterDepositorDetails(reqNumber);

          return fetchedData?.data;
        } catch (err) {
          toast.error(JSON.stringify(err));
          return {};
        } finally {
          setIsLoading(false);
        }
      } else {
        return {
          panAvailable: "yes",
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
            warehouseType: "",
            warehouseState: "",
            warehouseName: "",
            customerBranchName: "",
          },

          contactDetails: [{ contactNo: "234234234", email: "t@t.com", contactPerson: "Test", isPrimary: true }],
          bankDetails: [{ bankName: "asdfa", accountHolderName: "asdfgfds", ifscCode: "12341", accountNo: "123432", country: "IN" }],
        };
      }
    },
  });

  const { mutate: mutateRegisterDepositor, isPending: isSubmitting } = useMutation({
    mutationFn: (data: DocumentFormValues) => postRegisterDepositor(data),
    onSuccess: (res) => {
      toast.success(`Depositor registered successfully! ${res?.req_number}`);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to register depositor");
    },
  });

  const { mutate: mutateApproveForm, isPending: isApproveLoading } = useMutation({
    mutationFn: () => postApproveForm(reqNumber as string),
    onSuccess: (res) => {
      toast.success(`Depositor approved successfully! ${res?.req_number}`);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to register depositor");
    },
  });

  const { mutate: mutateRejectForm, isPending: isRejectLoading } = useMutation({
    mutationFn: () => postRejectForm(reqNumber as string),
    onSuccess: (res) => {
      toast.success(`Depositor approved successfully! ${res?.req_number}`);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to register depositor");
    },
  });

  const handleApproveClick = async () => {
    try {
      await mutateApproveForm();
      navigate(isEmployee ? ROUTES?.E_OVERVIEW : ROUTES?.C_OVERVIEW);
    } catch (error) {
      console.error("Unexpected error during approval:", error);
    }
  };

  const handleRejectClick = async () => {
    try {
      await mutateRejectForm();
      mutateRejectForm();
      navigate(isEmployee ? ROUTES?.E_OVERVIEW : ROUTES?.C_OVERVIEW);
    } catch (error) {
      console.error("Unexpected error during rejection:", error);
    }
  };

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

  const onSubmit = async (data: DocumentFormValues, event?: BaseSyntheticEvent) => {
    const nativeEvent = event?.nativeEvent as SubmitEvent | undefined;
    const action = nativeEvent?.submitter instanceof HTMLElement ? nativeEvent.submitter.getAttribute("value") : undefined;

    const payloadData = {
      ...data,
      action_for: isEmployee ? "E" : "C",
      action_type: action === "draft" ? "5" : "10",
      mob_number: STATIC_MOBILE_NO,
      plant: data?.prefferedLocationDetails?.warehouseName,
      pending_with: STATIC_EMP_NO,
      pernr: STATIC_EMP_NO,
    };

    // validatePincode(data);
    // validateDocuments(data);
    try {
      setIsLoading(true);
      mutateRegisterDepositor(payloadData);
      navigate(isEmployee ? ROUTES?.E_OVERVIEW : ROUTES?.C_OVERVIEW);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isSubmitting || isApproveLoading || isRejectLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-sm text-muted-foreground">Loading data...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-[inherit]">
        <div className="p-4">
          <div>
            <h1 className="text-3xl text-center font-semibold mb-4">New Depositor Registration</h1>
          </div>
          <Separator className="mb-4" />
          <div className="flex flex-col gap-4">
            <DocumentRegistration form={form} />
            <BasicDetailsSection form={form} />
            <PrefferedLocationSection form={form} />
            <ExporterImporterSection form={form} />
            <OptionalFeaturesSection form={form} />
            <ContactDetailsSection form={form} />
            <BankDetailsSection form={form} />
            <DocumentUploadTable />
          </div>
        </div>
        <div className="shadow-sm p-4 border-t flex gap-2">
          {viewOnly ? (
            isEmployee && (
              <>
                <Button type="button" variant={"secondary"} onClick={handleApproveClick} className="bg-green-100 hover:bg-green-200 border-none text-green-900 cursor-pointer">
                  Approve
                </Button>
                <Button type="button" variant={"secondary"} onClick={handleRejectClick} className="bg-red-100 hover:bg-red-200 border-none text-red-900 cursor-pointer">
                  Reject
                </Button>
              </>
            )
          ) : (
            <>
              <Button type="submit" name="action" value="draft">
                Save as Draft
              </Button>
              <Button type="submit" name="action" value="submit">
                Submit
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};

export default RegisterDepositorForm;
