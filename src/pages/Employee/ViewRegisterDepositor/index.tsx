import RegisterDepositorForm from "@/features/RegisterDepositor";
import { useParams } from "react-router-dom";

const EmpViewRegisterDepositor = () => {
  const { id } = useParams();
  return <RegisterDepositorForm viewOnly reqNumber={id} />;
};

export default EmpViewRegisterDepositor;
