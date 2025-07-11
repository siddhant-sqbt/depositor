import { type ReactNode } from "react";
import { CardHeader, CardTitle } from "../ui/card";

const FormCardHeading = ({ title }: { title: ReactNode }) => {
  return (
    <CardHeader>
      <CardTitle className="text-lg flex items-end gap-2">{title}</CardTitle>
    </CardHeader>
  );
};

export default FormCardHeading;
