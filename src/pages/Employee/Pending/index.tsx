import { CustomerTable } from "@/components/Common/CustomerTable";

const EmpPendingPage = () => {
  return (
    <>
      <div className="p-4 w-[inherit] overflow-auto">
        <CustomerTable isPendingPage />
      </div>
    </>
  );
};

export default EmpPendingPage;
