import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { registerDepositorFormSchema } from "@/lib/schema";
import type { DocumentFormValues } from "@/lib/types";
import { getFieldRequiredStatus } from "@/lib/utils";
import { Globe } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

const ExporterImporterSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  return (
    <Card>
      <FormCardHeading
        title={
          <>
            <Globe />
            Exporter/Importer & CHA Details
          </>
        }
      />
      <CardContent className="card-responsive-2">
        {/* Exporter/Importer Radio */}
        <FormField
          control={form.control}
          name="isExporterImporter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you also want to register as Exporter/Importer</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
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

        {/* IEC Number - show if Exporter/Importer is Yes */}
        {form.watch("isExporterImporter") === "Yes" ? (
          <FormField
            control={form.control}
            name="iecNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  IEC Number <span className="text-red-500 ml-0.5">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter IEC Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div></div>
        )}

        {/* CHA Radio */}
        <FormField
          control={form.control}
          name="isCHA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you want to register as CHA</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
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

        {/* CHA License Number - show if CHA is Yes */}
        {form.watch("isCHA") === "Yes" && (
          <FormField
            control={form.control}
            name="chaLicenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  CHA License Number <span className="text-red-500 ml-0.5">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter CHA License Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ExporterImporterSection;
