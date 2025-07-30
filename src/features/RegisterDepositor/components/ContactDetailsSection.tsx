import FormCardHeading from "@/components/Common/FormCardHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Contact No</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead className="w-[200px]">Person Name</TableHead>
              <TableHead className="w-[200px]">Designation</TableHead>
              <TableHead className="w-[100px] text-center">Primary</TableHead>
              <TableHead className="w-[100px] text-center">SMS</TableHead>
              <TableHead className="w-[100px] text-center">Email</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactFields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No contact details added. Click the + button to add a contact.
                </TableCell>
              </TableRow>
            ) : (
              contactFields.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="p-2">
                    <Input placeholder="Contact No" {...register(`contactDetails.${index}.contactNo`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Email" {...register(`contactDetails.${index}.email`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Person Name" {...register(`contactDetails.${index}.contactPerson`)} />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input placeholder="Designation" {...register(`contactDetails.${index}.contactPosition`)} />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <input
                      type="radio"
                      name="primaryContact"
                      checked={watch(`contactDetails.${index}.isPrimary`)}
                      onChange={() => {
                        contactFields.forEach((_, i) => setValue(`contactDetails.${i}.isPrimary`, i === index));
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <input
                      type="radio"
                      name="sms"
                      checked={watch(`contactDetails.${index}.primarySms`)}
                      onChange={() => {
                        contactFields.forEach((_, i) => setValue(`contactDetails.${i}.primarySms`, i === index));
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <input
                      type="radio"
                      name="email"
                      checked={watch(`contactDetails.${index}.primaryEmail`)}
                      onChange={() => {
                        contactFields.forEach((_, i) => setValue(`contactDetails.${i}.primaryEmail`, i === index));
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="text-center p-2">
                    {index !== 0 && (
                      <Button variant="destructive" size="icon" onClick={() => removeContact(index)} className="h-8 w-8 cursor-pointer disabled:cursor-not-allowed">
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

export default ContactDetailsSection;
