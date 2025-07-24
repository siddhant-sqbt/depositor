import { useFormContext, type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, downloadBase64File, openBase64File } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { DocumentFormValues, IAPIErrorResponse, IDocumentKeys } from "@/lib/types";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Eye, Trash } from "lucide-react";
import { deleteAttachment, getAttachment } from "@/lib/apis/apis";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
// import { useLocation } from "react-router-dom";

const DOCUMENTS_LIST = [
  { key: "panCard", label: "PAN Card", required: true },
  { key: "aadhaarCard", label: "Aadhaar Card", required: true },
  { key: "gstCertificate", label: "GST Certificate", required: false },
  { key: "tanDocument", label: "TAN Document", required: false },
  { key: "officeIdCard", label: "Office ID Card (Authorized Person)", required: true },
  { key: "letter", label: "Letter", required: false },
  { key: "specimenSignature", label: "Specimen Signature", required: true },
  { key: "cancelledCheque", label: "Bank Details (Cancelled Cheque)", required: false },
  { key: "other", label: "Other", required: false },
] as const;

export const DocumentUploadTable = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const location = useLocation();
  const subpaths = location?.pathname?.split("/");
  const { id } = useParams();

  const isView = subpaths?.includes("view");
  const isEdit = subpaths?.includes("edit");

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<DocumentFormValues>();

  const { mutateAsync: mutateApproveForm, isPending: isApproveLoading } = useMutation({
    mutationFn: (file_key: string) => getAttachment(id ?? "", file_key),
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to view document");
    },
  });

  const { mutateAsync: mutateDeleteForm, isPending: isDeleteLoading } = useMutation({
    mutationFn: (file_key: string) => deleteAttachment(id ?? "", file_key),
    onSuccess: () => {},
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Failed to delete document");
    },
  });

  const watchedFiles = watch("documents");

  const handleFileClick = async (key: string, isView: boolean) => {
    try {
      const res = await mutateApproveForm(key);
      if (isView) {
        openBase64File(res);
      } else {
        downloadBase64File(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileDelete = async (key: string) => {
    try {
      const res = await mutateDeleteForm(key);
      form.setValue(`documents.${key as IDocumentKeys}`, []);
      toast.success("File deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const getFileStatus = (docKey: string) => {
    const file = watchedFiles?.[docKey as keyof typeof watchedFiles];
    const hasError = errors?.documents?.[docKey as keyof typeof errors.documents];

    if (hasError) {
      return <span className="text-sm text-red-500">Required</span>;
    }

    if (file && file?.length > 0 && file?.[0]?.is_uploaded) {
      return (
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            onClick={() => handleFileClick(file?.[0]?.file_key, true)}
            variant="outline"
            size="icon"
            title="View"
            className="bg-green-100 hover:bg-green-200 border-none text-green-900"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            onClick={() => handleFileClick(file?.[0]?.file_key, false)}
            variant="outline"
            size="icon"
            title="Approve"
            className="bg-blue-100 hover:bg-blue-200 border-none text-blue-700"
          >
            <Download size={16} />
          </Button>
          {isEdit && (
            <Button
              type="button"
              onClick={() => handleFileDelete(file?.[0]?.file_key)}
              variant="outline"
              size="icon"
              title="Approve"
              className="bg-red-100 hover:bg-red-200 border-none text-red-900"
            >
              <Trash size={16} />
            </Button>
          )}
        </div>
      );
    }

    if (file && file.length > 0 && file?.[0]?.is_uploaded) {
      return <span className="text-sm text-green-600">Cloud Uploaded</span>;
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
              {DOCUMENTS_LIST?.map((doc) => (
                <TableRow key={doc?.key}>
                  <TableCell className="font-medium">
                    {doc.label}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </TableCell>
                  {/* <TableCell>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      {...register(`documents.${doc?.key}`)}
                      className={cn(
                        "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
                        errors?.documents?.[doc?.key as keyof typeof errors.documents] && "border-red-500"
                      )}
                    />
                  </TableCell> */}
                  <TableCell>
                    <div className="space-y-1">
                      {/* File input shown always for replacement */}
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        {...register(`documents.${doc?.key}`)}
                        className={cn(
                          "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
                          errors?.documents?.[doc?.key as keyof typeof errors.documents] && "border-red-500"
                        )}
                      />

                      {/* Watch file input */}
                      {(() => {
                        const file = watch(`documents.${doc?.key}`);
                        const prefilledFile = form.getValues(`documents.${doc?.key}`);

                        if (file?.[0]?.name) {
                          // New file selected
                          return <p className="text-sm text-gray-700">Selected: {file[0].name}</p>;
                        } else if (prefilledFile?.[0]?.is_uploaded) {
                          // Show prefilled uploaded file
                          return <div className="text-sm text-gray-500 italic">Uploaded: {prefilledFile[0].file_name} </div>;
                        }

                        return null;
                      })()}
                    </div>
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
