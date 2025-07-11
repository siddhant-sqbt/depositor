import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { DocumentFormValues } from "@/lib/types";
import { MapPin } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

const PrefferedLocationSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  return (
    <Card>
      <FormCardHeading
        title={
          <div className="grow flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <MapPin />
              Preffered Location
            </div>
          </div>
        }
      />

      <CardContent className="card-responsive-3">
        <FormField
          control={form.control}
          name="prefferedLocationDetails.warehouseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Warehouse Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prefferedLocationDetails.warehouseState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse State</FormLabel>
              <FormControl>
                <Input placeholder="Enter Warehouse State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prefferedLocationDetails.customerBranchName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Branch Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Customer Branch Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PrefferedLocationSection;
