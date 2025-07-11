import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { DocumentFormValues } from "@/lib/types";
import { File } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

const DocumentRegistration = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const panAvailable = form.watch("panAvailable");

  return (
    <Card>
      <FormCardHeading
        title={
          <>
            <File /> Document Validation
          </>
        }
      />
      <CardContent className="card-responsive-3">
        {/* PAN Available */}
        <FormField
          control={form.control}
          name="panAvailable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Available</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
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

        {/* PAN No */}
        {panAvailable === "Yes" && (
          <FormField
            control={form.control}
            name="panNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PAN Number" {...field} />
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>TAN Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter TAN Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GST No */}
        <FormField
          control={form.control}
          name="gstNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter GST Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* AADHAAR No */}
        <FormField
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
        />
      </CardContent>
    </Card>
  );
};

export default DocumentRegistration;
