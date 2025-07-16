/* eslint-disable @typescript-eslint/no-unused-vars */
import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStatesList, getStateWiseNameList } from "@/lib/apis/apis";
import { WAREHOUSE_TYPES } from "@/lib/constants";
import type { DocumentFormValues, IWarehouseLabel, IWarehouseNameOption } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

const PrefferedLocationSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const isEmployee = localStorage?.getItem("ROLE") === "E";
  const selectedType = form.watch("prefferedLocationDetails.warehouseType") || "";
  const selectedState = form.watch("prefferedLocationDetails.warehouseState") || "";

  const { data: currentStateList, isLoading: isStateLoading } = useQuery({
    queryKey: ["types", selectedType],
    queryFn: () => getStatesList(selectedType),
    enabled: !!selectedType,
  });

  const { data: namesList, isLoading: isNamesLoading } = useQuery({
    queryKey: ["states", selectedType, selectedState],
    queryFn: () => getStateWiseNameList(selectedType, selectedState),
    enabled: !!selectedType && !!selectedState,
  });

  const handleWarehouseTypeChange = () => {
    form.setValue("prefferedLocationDetails.customerBranchName", "");
    form.setValue("prefferedLocationDetails.warehouseName", "");
    form.setValue("prefferedLocationDetails.warehouseState", "");
  };

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

      <CardContent className={`${isEmployee ? "card-responsive-4" : "card-responsive-3"} `}>
        <FormField
          control={form.control}
          name="prefferedLocationDetails.warehouseType"
          render={({ field }) => (
            <FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormLabel className="">Warehouse Type</FormLabel>
              </FormItem>
              <Select
                onValueChange={(e) => {
                  handleWarehouseTypeChange();
                  field.onChange(e);
                }}
                value={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {WAREHOUSE_TYPES.map((type: IWarehouseLabel, index: number) => (
                    <SelectItem key={index} value={type?.value}>
                      {type?.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prefferedLocationDetails.warehouseState"
          render={({ field }) => (
            <FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormLabel className="">Warehouse State</FormLabel>
              </FormItem>
              <Select onValueChange={field.onChange} value={field.value} disabled={!selectedType}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder={!selectedType ? "Select warehouse Type first" : isStateLoading ? "Loading..." : "Select state"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isStateLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading states...
                    </SelectItem>
                  ) : (
                    currentStateList?.states?.map((option: string, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prefferedLocationDetails.warehouseName"
          render={({ field }) => (
            <FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormLabel className="">Warehouse Name</FormLabel>
              </FormItem>
              <Select onValueChange={field.onChange} value={field.value} disabled={!selectedType || !selectedState}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder={!selectedState ? "Select warehouse State first" : isNamesLoading ? "Loading..." : "Select Warehouse Name"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isNamesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading states...
                    </SelectItem>
                  ) : (
                    namesList?.data?.map((option: IWarehouseNameOption, index: number) => (
                      <SelectItem key={index} value={option?.plant}>
                        {option?.profit_center_description}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {isEmployee && (
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
        )}
      </CardContent>
    </Card>
  );
};

export default PrefferedLocationSection;
