import { ROUTES } from "@/lib/constants";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthField } from "@/store/slice/authSlice";

const SSORedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      const user = jwtDecode(token);
      dispatch(setAuthField({ key: "employeeData", value: user }));
      dispatch(setAuthField({ key: "userRole", value: "E" }));
      dispatch(setAuthField({ key: "authToken", value: token }));

      setTimeout(() => {
        navigate(ROUTES?.E_PENDING);
        toast.success("user logged in!");
      }, 200);
    } else {
      navigate(ROUTES?.LOGIN);
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default SSORedirectHandler;
