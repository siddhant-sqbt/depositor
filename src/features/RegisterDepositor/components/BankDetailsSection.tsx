import FormCardHeading from "@/components/Common/FormCardHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

      <CardContent className="space-y-4">
        {bankFields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-6 gap-4 items-center">
            <Input placeholder="Bank Name" {...register(`bankDetails.${index}.bankName`)} />
            <Input placeholder="Holder Name" {...register(`bankDetails.${index}.accountHolderName`)} />
            <Input placeholder="IFSC" {...register(`bankDetails.${index}.ifscCode`)} />
            <Input placeholder="Account Number" {...register(`bankDetails.${index}.accountNo`)} />
            <Input placeholder="IN" {...register(`bankDetails.${index}.country`)} />
            <Button variant="destructive" size="icon" onClick={() => removeBank(index)}>
              <Trash />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BankDetailsSection;
