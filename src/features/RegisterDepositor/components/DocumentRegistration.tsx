import FormCardHeading from "@/components/Common/FormCardHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getFieldRequirements } from "@/lib/schema";
import type { DocumentFormValues } from "@/lib/types";
import { CircleCheck, File } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

const DocumentRegistration = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const panAvailable = form.watch("panAvailable");
  const partyType = form.watch("partyType");
  const panNumber = form.watch("panNumber");
  const requirements = getFieldRequirements(panNumber ?? "");

  const [isAadhaarRequired, setIsAadharRequired] = useState<boolean>(false);
  const [isGSTRequired, setIsGSTRequired] = useState<boolean>(false);
  const [isTANRequired, setIsTANRequired] = useState<boolean>(false);
  const [isPANRequired, setIsPANRequired] = useState<boolean>(false);

  useEffect(() => {
    setIsAadharRequired((panAvailable === "yes" && requirements?.aadharRequired) || (panAvailable === "no" && partyType === "Individual"));
  }, [panAvailable, requirements, panNumber, partyType]);

  useEffect(() => {
    setIsGSTRequired(panAvailable === "yes" && requirements.gstRequired);
    setIsTANRequired(panAvailable === "yes" && requirements.tanRequired);
  }, [panAvailable, requirements, panNumber]);

  useEffect(() => {
    setIsPANRequired(panAvailable === "yes");
  }, [panAvailable]);

  const requiredDocs = [isPANRequired && "PAN Card", isTANRequired && "TAN Document", isGSTRequired && "GST Certificate", isAadhaarRequired && "Aadhaar Card"].filter(Boolean);

  const handlePanNumberChange = () => {
    console.log("PAN Number onChange triggered");
    form.setValue("tanNumber", "");
    form.setValue("gstNumber", "");
    form.setValue("aadhaarNumber", "");
    form.setValue("partyType", "");
    form.setValue("subPartyType", "");
  };

  const handlePanAvailableChange = () => {
    console.log("PAN Checkbox onChange triggered");
    form.setValue("panNumber", "");
    form.setValue("tanNumber", "");
    form.setValue("gstNumber", "");
    form.setValue("aadhaarNumber", "");
    form.setValue("partyType", "");
    form.setValue("subPartyType", "");
  };

  const handleFieldsValidate = () => {
    // const promise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     return resolve("Fields Validated Successfully!");
    //   }, 2000);
    // });
    // toast.loading("validating Fields");
    // setTimeout(() => {
    //   toast.success("Fields Validated succesfully!");
    // }, 1000);
  };

  const handleGstNumberChange = (gstNumber: string) => {
    console.log("GST Number onChange triggered");
    const stateCode = gstNumber?.length >= 2 ? Number(gstNumber?.substring(0, 2)) : "";
    if (stateCode) {
      form.setValue("state", stateCode.toString());
    }
  };
  return (
    <Card>
      <FormCardHeading
        title={
          <>
            <File /> Document Validation
          </>
        }
      />
      <CardContent className="flex flex-col">
        {/* PAN Checkbox */}
        <FormField
          control={form.control}
          name="panAvailable"
          render={({ field }) => (
            <FormItem className="mx-auto mb-4">
              <FormLabel className="mx-auto mb-2">PAN Available</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.clearErrors();
                    handlePanAvailableChange();
                  }}
                  value={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* PAN No */}
        <div className={`grid ${isPANRequired ? "grid-cols-4" : "grid-cols-3"} gap-3 mt-4`}>
          {isPANRequired && (
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number {isPANRequired && <span className="text-red-500 ml-1">*</span>}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter PAN Number"
                      disabled={!isPANRequired}
                      {...field}
                      onChange={(e) => {
                        const uppercaseVal = e?.target?.value?.toUpperCase();
                        field.onChange(uppercaseVal);
                        form.clearErrors();
                        handlePanNumberChange();
                      }}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 10) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* TAN No */}
          <FormField
            control={form.control}
            name="tanNumber"
            render={({ field, fieldState }) => {
              const hasError = fieldState.error;

              return (
                <FormItem>
                  <FormLabel className={`${hasError ? "text-red-600" : ""}`}>
                    TAN Number
                    {isTANRequired ? <span className="text-red-500 ml-1">*</span> : <span className="text-gray-500 ml-1">(Optional)</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isTANRequired ? "Enter TAN Number (Required)" : "Enter TAN Number (Optional)"}
                      className={`${hasError ? "border-red-500 focus:border-red-500" : ""}`}
                      {...field}
                      onChange={(e) => {
                        const uppercaseVal = e?.target?.value?.toUpperCase();
                        field.onChange(uppercaseVal);
                      }}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 10) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="gstNumber"
            render={({ field, fieldState }) => {
              const hasError = fieldState.error;

              return (
                <FormItem>
                  <FormLabel className={`${hasError ? "text-red-600" : ""}`}>
                    GST Number
                    {isGSTRequired ? <span className="text-red-500 ml-1">*</span> : <span className="text-gray-500 ml-1">(Optional)</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isGSTRequired ? "Enter GST Number (Required)" : "Enter GST Number (Optional)"}
                      className={`${hasError ? "border-red-500 focus:border-red-500" : ""}`}
                      {...field}
                      onChange={(e) => {
                        const uppercaseVal = e?.target?.value?.toUpperCase();
                        field.onChange(uppercaseVal);
                        handleGstNumberChange(e.target.value);
                      }}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 15) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 15);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* AADHAAR No */}
          <FormField
            control={form.control}
            name="aadhaarNumber"
            render={({ field, fieldState }) => {
              const isDisabled = requirements?.aadharDisabled;
              const hasError = fieldState.error;

              if (isDisabled) {
                return <></>;
                // return (
                //   <FormItem>
                //     <FormLabel className="text-gray-400">Aadhaar Number (Not Required)</FormLabel>
                //     <FormControl>
                //       <Input placeholder="Aadhaar Number not required" disabled {...field} />
                //     </FormControl>
                //   </FormItem>
                // );
              }

              return (
                <FormItem>
                  <FormLabel className={`${hasError ? "text-red-600" : ""}`}>
                    Aadhaar Number
                    {isAadhaarRequired ? <span className="text-red-500">*</span> : <span className="text-gray-500 ml-1">(Optional)</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isAadhaarRequired ? "Enter Aadhaar Number (Required)" : "Enter Aadhaar Number (Optional)"}
                      className={`${
                        hasError ? "border-red-500 focus:border-red-500" : ""
                      } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      {...field}
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 12) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 12);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* <FormField
            control={form.control}
            name="aadhaarNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AADHAAR Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter AADHAAR Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <Button variant={"outline"} type="button" onClick={handleFieldsValidate} className="cursor-pointer mt-4 mx-auto">
          <CircleCheck className="text-green-500" /> Validate
        </Button>
        <div className="text-gray-500">{requiredDocs.length > 0 && <div>Documents Required: {requiredDocs.join(", ")}</div>}</div>
      </CardContent>
    </Card>
  );
};

export default DocumentRegistration;
