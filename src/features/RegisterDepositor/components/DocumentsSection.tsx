import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { DocumentFormValues } from "@/lib/types";

const DOCUMENTS_LIST = [
  { key: "panCard", label: "PAN Card", required: true },
  { key: "aadhaarCard", label: "Aadhaar Card", required: true },
  { key: "gstCertificate", label: "GST Certificate", required: false },
  { key: "tanDocument", label: "TAN Document", required: false },
  { key: "officeIdCard", label: "Office ID Card (Authorized Person)", required: true },
  { key: "letter", label: "Letter", required: false },
  { key: "specimenSignature", label: "Specimen Signature", required: true },
  { key: "other", label: "Other", required: false },
] as const;

export const DocumentUploadTable = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<DocumentFormValues>();

  const watchedFiles = watch("documents");

  const getFileStatus = (docKey: string) => {
    const file = watchedFiles?.[docKey as keyof typeof watchedFiles];
    const hasError = errors?.documents?.[docKey as keyof typeof errors.documents];

    if (hasError) {
      return <span className="text-sm text-red-500">Required</span>;
    }

    if (file && file.length > 0) {
      return <span className="text-sm text-green-600">Uploaded</span>;
    }

    return <span className="text-sm text-gray-500">-</span>;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Upload Documents</Label>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Upload</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DOCUMENTS_LIST.map((doc) => (
                <TableRow key={doc.key}>
                  <TableCell className="font-medium">
                    {doc.label}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      {...register(`documents.${doc.key}`)}
                      className={cn(
                        "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
                        errors?.documents?.[doc.key as keyof typeof errors.documents] && "border-red-500"
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right">{getFileStatus(doc.key)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
