import FormCardHeading from "@/components/Common/FormCardHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { DocumentFormValues } from "@/lib/types";
import { Plus, Trash, User } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

const ContactDetailsSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const { register, control, watch, setValue } = form;

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: "contactDetails",
  });

  return (
    <Card>
      <FormCardHeading
        title={
          <div className="grow flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <User />
              Contact Details
            </div>
            <Button variant="outline" size="icon" type="button" onClick={() => appendContact({ contactNo: "", email: "", contactPerson: "", isPrimary: false })}>
              <Plus />
            </Button>
          </div>
        }
      />
      <CardContent className="space-y-4">
        {contactFields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-6 gap-4 items-center">
            <Input placeholder="Contact No" {...register(`contactDetails.${index}.contactNo`)} />
            <Input placeholder="Email" {...register(`contactDetails.${index}.email`)} />
            <Input placeholder="Contact Person" {...register(`contactDetails.${index}.contactPerson`)} />
            <input
              type="radio"
              name="primaryContact"
              checked={watch(`contactDetails.${index}.isPrimary`)}
              onChange={() => {
                contactFields.forEach((_, i) => setValue(`contactDetails.${i}.isPrimary`, i === index));
              }}
            />
            <Button variant="destructive" size="icon" onClick={() => removeContact(index)}>
              <Trash />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactDetailsSection;
