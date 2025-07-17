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
import { getRegisterDepositorDetails, postApproveForm, postRegisterDepositor, postRejectForm, updateRegisterDepositor } from "@/lib/apis/apis";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES, STATIC_EMP_NO, STATIC_MOBILE_NO } from "@/lib/constants";
import BasicDetailsSection from "./components/BasicDetailsSection";
import { useState, type BaseSyntheticEvent } from "react";
import type { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import ServiceSecondarySection from "./components/ServiceSecondarySection";
import RepresentativeSection from "./components/RepresentativeSection";
import { buildAttachments, buildDocumentsFromAttachments } from "@/lib/utils";
// import RepresentativeSection from "./components/RepresentativeSection";

// action_type (number), action_for (C or E)

const RegisterDepositorForm: React.FC<IRegisterDepositorFormProps> = ({ viewOnly, reqNumber }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const subpaths = location?.pathname?.split("/");

  const isView = subpaths?.includes("view");
  const isEdit = subpaths?.includes("edit");

  const isEmployee = localStorage?.getItem("ROLE") === "E";
  const [isLoading, setIsLoading] = useState<boolean>((!!viewOnly || !!isEdit) && !!reqNumber);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(registerDepositorFormSchema),
    defaultValues: async () => {
      if ((viewOnly || isEdit) && reqNumber) {
        try {
          setIsLoading(true);
          const fetchedData = await getRegisterDepositorDetails(reqNumber);
          const data = fetchedData?.data;
          const docs = buildDocumentsFromAttachments(data?.attachments);
          delete data?.["attachments"];
          data.documents = docs;
          console.log("Data: ", data);
          return data;
        } catch (err) {
          toast.error(JSON.stringify(err));
          return {};
        } finally {
          setIsLoading(false);
        }
      } else {
        // return {
        //   panAvailable: "yes",
        //   panNumber: "AAADAAA",
        //   tanNumber: "TAN121212",
        //   gstNumber: "27AAACI1234J1ZV",
        //   aadhaarNumber: "123412341234",
        //   partyType: "Individual",
        //   subPartyType: "Railways",
        //   pinNumber: "999998",
        //   name1: "Siddhant",
        //   name2: "Name 2",
        //   name3: "Name 3",
        //   address1: "Test Address 1",
        //   address2: "Test Address 2",
        //   address3: "Test Address 3",
        //   city: "City testing",
        //   state: "27",
        //   district: "1053",
        //   isExporterImporter: "Yes",
        //   iecNumber: "IEC1234567",
        //   isCHA: "Yes",
        //   chaLicenseNumber: "CHA testing",
        //   optionalFeatures: {
        //     forwarder: false,
        //     consolid: true,
        //     shippingLine: false,
        //     transporter: true,
        //     rent: false,
        //     auction: true,
        //   },
        //   serviceSecondaryAddress: [
        //     {
        //       serviceBranchName: "Service Name 1",
        //       serviceAddress1: "Add1 ",
        //       serviceAddress2: "Add2",
        //       serviceAddress3: "Add3",
        //       serviceState: "",
        //       serviceDistrict: "234234",
        //       serviceCity: "City smart",
        //       servicePincode: "2010101",
        //     },
        //   ],
        //   representative: [
        //     {
        //       repName: "Sample Name",
        //       repMobileNo: "234234234",
        //       repEmail: "email@e.com",
        //       repPosition: "Position 21",
        //       repCreationDate: "",
        //       repIsActivated: "",
        //       repDeactivateDate: "",
        //       repOtpVerified: "",
        //     },
        //     {
        //       repName: "Sample REp 2",
        //       repMobileNo: "2353469887",
        //       repEmail: "email2@e.com",
        //       repPosition: "Position 22",
        //       repCreationDate: "",
        //       repIsActivated: "",
        //       repDeactivateDate: "",
        //       repOtpVerified: "",
        //     },
        //   ],
        //   prefferedLocationDetails: {
        //     warehouseType: "RO",
        //     warehouseState: "Tamil Nadu",
        //     warehouseName: "2600",
        //     customerBranchName: "",
        //   },
        //   contactDetails: [
        //     {
        //       contactNo: "234234234",
        //       email: "t@t.com",
        //       contactPerson: "Test",
        //       isPrimary: false,
        //     },
        //     {
        //       contactNo: "9123456780",
        //       email: "contact2@example.com",
        //       contactPerson: "Ms. B",
        //       isPrimary: true,
        //     },
        //   ],
        //   bankDetails: [
        //     {
        //       bankName: "asdfa",
        //       accountHolderName: "asdfgfds",
        //       ifscCode: "12341",
        //       accountNo: "123432",
        //       country: "IN",
        //     },
        //     {
        //       bankName: "Bank testing name",
        //       accountHolderName: "Account Holder",
        //       ifscCode: "IFSC34242",
        //       accountNo: "123456789012",
        //       country: "UK",
        //     },
        //   ],
        //   documents: {
        //     panCard: {},
        //     aadhaarCard: {},
        //     gstCertificate: {},
        //     tanDocument: {},
        //     officeIdCard: {},
        //     letter: {},
        //     specimenSignature: {},
        //     other: {},
        //   },
        //   action_for: "C",
        //   action_type: "5",
        //   mob_number: "9876543210",
        //   plant: "2600",
        //   pending_with: "200015",
        //   pernr: "200015",
        // };
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

          representative: [
            {
              repName: "",
              repMobileNo: "",
              repEmail: "",
              repPosition: "",
              repCreationDate: "",
              repIsActivated: "",
              repDeactivateDate: "",
              repOtpVerified: "",
            },
          ],

          serviceSecondaryAddress: [
            {
              serviceBranchName: "",
              serviceAddress1: "",
              serviceAddress2: "",
              serviceAddress3: "",
              serviceState: "",
              serviceDistrict: "",
              serviceCity: "",
              servicePincode: "",
            },
          ],

          contactDetails: [{ contactNo: "", email: "", contactPerson: "", isPrimary: true }],
          bankDetails: [{ bankName: "", accountHolderName: "", ifscCode: "", accountNo: "", country: "IN" }],
        };
      }
    },
  });

  const { mutateAsync: mutateRegisterDepositor, isPending: isSubmitting } = useMutation({
    mutationFn: (data: DocumentFormValues) => postRegisterDepositor(data),
    onSuccess: (res) => {
      toast.success(`Depositor registered successfully! ${res?.req_number}`);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to register depositor");
    },
  });

  const { mutateAsync: mutateUpdateRegisterDepositor, isPending: isUpdateSubmitting } = useMutation({
    mutationFn: (data: DocumentFormValues) => updateRegisterDepositor(data),
    onSuccess: (res) => {
      toast.success(`Depositor registered successfully! ${res?.req_number}`);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to register depositor");
    },
  });

  const { mutateAsync: mutateApproveForm, isPending: isApproveLoading } = useMutation({
    mutationFn: (id: string) => postApproveForm({ user_id: STATIC_EMP_NO, remarks: "" }, id),
    onSuccess: (res) => {
      toast.success(`Depositor approved successfully! ${res?.req_number}`);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to register depositor");
    },
  });

  console.log("error", form?.formState.errors);

  const { mutate: mutateRejectForm, isPending: isRejectLoading } = useMutation({
    mutationFn: (id: string) => postRejectForm({ user_id: STATIC_EMP_NO, remarks: "" }, id),
    onSuccess: (res) => {
      toast.success(`Depositor rejected! ${res?.req_number}`);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to register depositor");
    },
  });

  const handleApproveClick = async () => {
    try {
      if (reqNumber) {
        await mutateApproveForm(reqNumber);
      } else {
        toast.error("Request number not found!");
        return;
      }
      navigate(isEmployee ? ROUTES?.E_OVERVIEW : ROUTES?.C_OVERVIEW);
    } catch (error) {
      console.error("Unexpected error during approval:", error);
    }
  };

  const handleRejectClick = async () => {
    try {
      if (reqNumber) {
        await mutateRejectForm(reqNumber);
      } else {
        toast.error("Request number not found!");
        return;
      }
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

  const validateDocuments = (data: DocumentFormValues) => {
    // Check PAN Card validation
    if (data.panNumber && data?.documents?.panCard?.length === 0) {
      toast.error("PAN Card document is required when PAN number is provided");
    }

    // Check Aadhaar Card validation
    if (data.aadhaarNumber && data?.documents?.aadhaarCard?.length === 0) {
      toast.error("Aadhaar Card document is required when Aadhaar number is provided");
    }

    // Check GST Certificate validation
    if (data?.gstNumber && data?.documents?.gstCertificate?.length === 0) {
      toast.error("GST Certificate document is required when GST number is provided");
    }

    // Check TAN Document validation
    if (data.tanNumber && data?.documents?.tanDocument?.length === 0) {
      toast.error("TAN Document is required when TAN number is provided");
    }
  };

  const onSubmit = async (data: DocumentFormValues, event?: BaseSyntheticEvent) => {
    const jsonData: any = data;
    const nativeEvent = event?.nativeEvent as SubmitEvent | undefined;
    const action = nativeEvent?.submitter instanceof HTMLElement ? nativeEvent.submitter.getAttribute("value") : undefined;

    const documents = jsonData?.documents;

    const attachments = await buildAttachments(documents);

    delete jsonData["documents"];

    const payloadData = {
      ...jsonData,
      action_for: isEmployee ? "E" : "C",
      action_type: action === "draft" ? "5" : "10",
      mob_number: STATIC_MOBILE_NO,
      ...(isEmployee && { plant: jsonData?.prefferedLocationDetails?.warehouseName }),
      ...(isEdit && { req_number: reqNumber }),
      pending_with: STATIC_EMP_NO,
      pernr: STATIC_EMP_NO,
      attachments: attachments,
    };

    // validatePincode(data);
    validateDocuments(data);
    try {
      setIsLoading(true);
      let res;
      if (isEdit) {
        res = await mutateUpdateRegisterDepositor(payloadData);
      } else {
        res = await mutateRegisterDepositor(payloadData);
      }
      if (res?.success && isEmployee) {
        await mutateApproveForm(res?.req_number);
        navigate(isEmployee ? ROUTES?.E_OVERVIEW : ROUTES?.C_OVERVIEW);
      } else {
        navigate(isEmployee ? ROUTES?.E_OVERVIEW : ROUTES?.C_OVERVIEW);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isSubmitting || isApproveLoading || isRejectLoading || isUpdateSubmitting) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-sm text-muted-foreground">Loading data...</span>
      </div>
    );
  }

  // console.log("form errors", form.formState.errors); // <- watch this in dev tools
  // console.log("form values", form.getValues().documents); // <- watch this in dev tools

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
            <ServiceSecondarySection form={form} />
            <RepresentativeSection form={form} />
            <BankDetailsSection form={form} />
            <DocumentUploadTable form={form} />
          </div>
        </div>
        <div className="shadow-sm p-4 border-t flex gap-2">
          {isView ? (
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
