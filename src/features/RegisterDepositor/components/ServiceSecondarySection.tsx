import FormCardHeading from "@/components/Common/FormCardHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { STATE_PINCODE_OPTIONS } from "@/lib/constants";
import type { DocumentFormValues, IStateObject } from "@/lib/types";
import { LocationEdit, Plus, Trash } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

const ServiceSecondarySection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const { register, control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "serviceSecondaryAddress",
  });

  const emptyServiceSecondaryRow = {
    serviceBranchName: "",
    serviceAddress1: "",
    serviceAddress2: "",
    serviceAddress3: "",
    serviceState: "",
    serviceDistrict: "",
    serviceCity: "",
    servicePincode: "",
    isActive: false,
  };

  return (
    <Card>
      <FormCardHeading
        title={
          <div className="grow flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <LocationEdit />
              Service Secondary Address
            </div>
            <Button variant="outline" size="icon" type="button" onClick={() => append(emptyServiceSecondaryRow)}>
              <Plus />
            </Button>
          </div>
        }
      />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Service Branch Name</TableHead>
              <TableHead className="w-[150px] text-center">Address 1</TableHead>
              <TableHead className="w-[150px] text-center">Address 2</TableHead>
              <TableHead className="w-[150px] text-center">Address 3</TableHead>
              <TableHead className="w-[80px] text-center">State</TableHead>
              <TableHead className="w-[100px] text-center">District</TableHead>
              <TableHead className="w-[100px] text-center">City</TableHead>
              <TableHead className="w-[100px] text-center">Pincode</TableHead>
              <TableHead className="w-[100px] text-center">Active Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No Secondary Address details added. Click the + button to add an Address.
                </TableCell>
              </TableRow>
            ) : (
              fields?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="p-2">
                    <Input placeholder="Service Branch Name" {...register(`serviceSecondaryAddress.${index}.serviceBranchName`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Enter Address 1" {...register(`serviceSecondaryAddress.${index}.serviceAddress1`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Enter Address 2" {...register(`serviceSecondaryAddress.${index}.serviceAddress2`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Enter Address 3" {...register(`serviceSecondaryAddress.${index}.serviceAddress3`)} />
                  </TableCell>
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="p-2">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STATE_PINCODE_OPTIONS?.map((stateObj: IStateObject, index: number) => {
                              return (
                                <SelectItem value={`${stateObj?.value}`} key={index}>
                                  {stateObj?.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TableCell className="text-center p-2">
                    <Input placeholder="Enter District" {...register(`serviceSecondaryAddress.${index}.serviceDistrict`)} />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <Input placeholder="Enter Service City" {...register(`serviceSecondaryAddress.${index}.serviceCity`)} />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <Input placeholder="Enter Pincode" {...register(`serviceSecondaryAddress.${index}.servicePincode`)} />
                  </TableCell>{" "}
                  <TableCell className="text-center p-2">
                    <Input type="checkbox" placeholder="Enter Pincode" {...register(`serviceSecondaryAddress.${index}.isActive`)} className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    {index !== 0 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields?.length === 1}
                        className="h-8 w-8 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ServiceSecondarySection;
