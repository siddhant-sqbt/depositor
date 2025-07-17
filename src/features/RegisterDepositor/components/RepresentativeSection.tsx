import FormCardHeading from "@/components/Common/FormCardHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DocumentFormValues } from "@/lib/types";
import { Plus, Trash, UserCog } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

const RepresentativeSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const { register, control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "representative",
  });

  const emptyRepresentativeRow = {
    repName: "",
    repMobileNo: "",
    repEmail: "",
    repPosition: "",
    repCreationDate: "",
    repIsActivated: "",
    repDeactivateDate: "",
    repOtpVerified: "",
  };

  //   const activationOptions = [
  //     { value: "true", label: "Yes" },
  //     { value: "false", label: "No" },
  //   ];

  //   const otpVerificationOptions = [
  //     { value: "true", label: "Verified" },
  //     { value: "false", label: "Not Verified" },
  //   ];

  return (
    <Card>
      <FormCardHeading
        title={
          <div className="grow flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <UserCog />
              Representative Details
            </div>
            <Button variant="outline" size="icon" type="button" onClick={() => append(emptyRepresentativeRow)}>
              <Plus />
            </Button>
          </div>
        }
      />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead className="w-[250px]">Mobile No</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead className="w-[350px]">Position</TableHead>
              {/* <TableHead className="w-[130px]">Creation Date</TableHead>
              <TableHead className="w-[100px] text-center">Activated</TableHead>
              <TableHead className="w-[130px] text-center">Deactivate Date</TableHead>
              <TableHead className="w-[120px] text-center">OTP Verified</TableHead>
              <TableHead className="w-[50px] text-center">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  No Representative details added. Click the + button to add a Representative.
                </TableCell>
              </TableRow>
            ) : (
              fields?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="p-2">
                    <Input placeholder="Enter Name" {...register(`representative.${index}.repName`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Mobile Number" {...register(`representative.${index}.repMobileNo`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Email Address" type="email" {...register(`representative.${index}.repEmail`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Position" {...register(`representative.${index}.repPosition`)} />
                  </TableCell>
                  {/* <TableCell className="p-2">
                    <Input placeholder="Creation Date" type="date" {...register(`representative.${index}.repCreationDate`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <FormField
                      control={form.control}
                      name={`representative.${index}.repIsActivated`}
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {activationOptions.map((option, optIndex) => (
                                <SelectItem value={option.value} key={optIndex}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Deactivate Date" type="date" {...register(`representative.${index}.repDeactivateDate`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <FormField
                      control={form.control}
                      name={`representative.${index}.repOtpVerified`}
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {otpVerificationOptions.map((option, optIndex) => (
                                <SelectItem value={option.value} key={optIndex}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell> */}
                  <TableCell className="text-center p-2">
                    <Button variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields?.length === 1} className="h-8 w-8 cursor-pointer">
                      <Trash className="h-4 w-4" />
                    </Button>
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

export default RepresentativeSection;
