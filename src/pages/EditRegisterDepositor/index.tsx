import RegisterDepositorForm from "@/features/RegisterDepositor";
import { useParams } from "react-router-dom";

const EditRegisterDepositor = () => {
  const { id } = useParams();
  return <RegisterDepositorForm reqNumber={id} />;
};

export default EditRegisterDepositor;
