import { ROUTES } from "@/lib/constants";
import type { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isEmployee }: { children: React.ReactNode; isEmployee: boolean }) => {
  const { empNumber, empPernr, employeeData, mobileNo, plantNo, userData, userRole } = useSelector((state: RootState) => state.auth);

  console.log("userRole", userRole);

  //   console.log("userRole: ", userRole);
  //   if (!userRole) {
  //     return <Navigate to={ROUTES?.LOGIN} replace />;
  //   }
  //   if (isEmployee && userRole !== "E") {
  //     return <Navigate to={ROUTES?.C_OVERVIEW} replace />;
  //   }
  //   if (!isEmployee && userRole !== "C") {
  //     return <Navigate to={ROUTES?.E_OVERVIEW} replace />;
  //   }
  return children;
};

export default ProtectedRoute;
