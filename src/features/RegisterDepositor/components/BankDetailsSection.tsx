import FormCardHeading from "@/components/Common/FormCardHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DocumentFormValues } from "@/lib/types";
import { Landmark, Plus, Trash } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

const BankDetailsSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const { register, control } = form;

  const {
    fields: bankFields,
    append: appendBank,
    remove: removeBank,
  } = useFieldArray({
    control,
    name: "bankDetails",
  });

  return (
    <Card>
      <FormCardHeading
        title={
          <div className="grow flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <Landmark />
              Bank Details
            </div>
            <Button variant="outline" size="icon" type="button" onClick={() => appendBank({ bankName: "", accountHolderName: "", ifscCode: "", accountNo: "", country: "IN" })}>
              <Plus />
            </Button>
          </div>
        }
      />

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Bank Name</TableHead>
              <TableHead className="w-[180px]">Account Holder</TableHead>
              <TableHead className="w-[120px]">IFSC Code</TableHead>
              <TableHead className="w-[150px]">Account Number</TableHead>
              <TableHead className="w-[100px]">Country</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bankFields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No bank details added. Click the + button to add bank details.
                </TableCell>
              </TableRow>
            ) : (
              bankFields.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="p-2">
                    <Input placeholder="Bank Name" {...register(`bankDetails.${index}.bankName`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Holder Name" {...register(`bankDetails.${index}.accountHolderName`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="IFSC" {...register(`bankDetails.${index}.ifscCode`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Account Number" {...register(`bankDetails.${index}.accountNo`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="IN" {...register(`bankDetails.${index}.country`)} />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <Button variant="destructive" size="icon" onClick={() => removeBank(index)} className="h-8 w-8">
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

export default BankDetailsSection;
