import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { DocumentFormValues } from "@/lib/types";
import { Cog } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

const OptionalFeaturesSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  return (
    <Card>
      <FormCardHeading
        title={
          <>
            <Cog /> Optional Features for CFS/ICD
          </>
        }
      />

      <CardContent className="grid gap-4 sm:grid-cols-2">
        {/* Forwarder */}
        <FormField
          control={form.control}
          name="optionalFeatures.forwarder"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Forwarder</FormLabel>
            </FormItem>
          )}
        />

        {/* Consolid */}
        <FormField
          control={form.control}
          name="optionalFeatures.consolid"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Consolid</FormLabel>
            </FormItem>
          )}
        />

        {/* Shipping Line */}
        <FormField
          control={form.control}
          name="optionalFeatures.shippingLine"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Shipping Line</FormLabel>
            </FormItem>
          )}
        />

        {/* Transporter */}
        <FormField
          control={form.control}
          name="optionalFeatures.transporter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Transporter</FormLabel>
            </FormItem>
          )}
        />

        {/* Rent */}
        <FormField
          control={form.control}
          name="optionalFeatures.rent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Rent</FormLabel>
            </FormItem>
          )}
        />

        {/* Auction */}
        <FormField
          control={form.control}
          name="optionalFeatures.auction"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Auction</FormLabel>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default OptionalFeaturesSection;
