import { DataTableDemo } from "@/components/Common/CustomerTable";

const CustomerOverview = () => {
  return (
    <>
      <div className="p-4 w-[inherit] overflow-auto">
        <DataTableDemo />
      </div>
    </>
  );
};

export default CustomerOverview;
