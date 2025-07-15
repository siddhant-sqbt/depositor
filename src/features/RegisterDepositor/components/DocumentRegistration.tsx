import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getFieldRequirements } from "@/lib/schema";
import type { DocumentFormValues } from "@/lib/types";
import { File } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

const DocumentRegistration = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const panAvailable = form.watch("panAvailable");
  const panNumber = form.watch("panNumber");
  const requirements = getFieldRequirements(panNumber ?? "");

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
            <FormItem className="mx-auto">
              <FormLabel>PAN Available</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    handlePanAvailableChange();
                  }}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-4 gap-3 mt-4">
          {/* PAN No */}
          <FormField
            control={form.control}
            name="panNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter PAN Number"
                    disabled={panAvailable !== "Yes"}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handlePanNumberChange();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TAN No */}
          <FormField
            control={form.control}
            name="tanNumber"
            render={({ field, fieldState }) => {
              const isRequired = panAvailable === "Yes" && requirements.tanRequired;
              const hasError = fieldState.error;

              return (
                <FormItem>
                  <FormLabel className={`${hasError ? "text-red-600" : ""}`}>
                    TAN Number
                    {isRequired ? <span className="text-red-500 ml-1">*</span> : <span className="text-gray-500 ml-1">(Optional)</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isRequired ? "Enter TAN Number (Required)" : "Enter TAN Number (Optional)"}
                      className={`${hasError ? "border-red-500 focus:border-red-500" : ""}`}
                      {...field}
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
              const isRequired = panAvailable === "Yes" && requirements.gstRequired;
              const hasError = fieldState.error;

              return (
                <FormItem>
                  <FormLabel className={`${hasError ? "text-red-600" : ""}`}>
                    GST Number
                    {isRequired ? <span className="text-red-500 ml-1">*</span> : <span className="text-gray-500 ml-1">(Optional)</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isRequired ? "Enter GST Number (Required)" : "Enter GST Number (Optional)"}
                      className={`${hasError ? "border-red-500 focus:border-red-500" : ""}`}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleGstNumberChange(e.target.value);
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
              const isRequired = panAvailable === "Yes" && requirements?.aadharRequired;
              const hasError = fieldState.error;

              if (isDisabled) {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-400">Aadhaar Number (Not Required)</FormLabel>
                    <FormControl>
                      <Input placeholder="Aadhaar Number not required" disabled {...field} />
                    </FormControl>
                  </FormItem>
                );
              }

              return (
                <FormItem>
                  <FormLabel className={`${hasError ? "text-red-600" : ""}`}>
                    Aadhaar Number
                    {isRequired ? <span className="text-red-500">*</span> : <span className="text-gray-500 ml-1">(Optional)</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isRequired ? "Enter Aadhaar Number (Required)" : "Enter Aadhaar Number (Optional)"}
                      className={`${hasError ? "border-red-500 focus:border-red-500" : ""}`}
                      {...field}
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
      </CardContent>
    </Card>
  );
};

export default DocumentRegistration;
