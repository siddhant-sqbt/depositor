import { ROUTES } from "@/lib/constants";
import type { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isEmployee }: { children: React.ReactNode; isEmployee: boolean }) => {
  const { userRole } = useSelector((state: RootState) => state.auth);

  if (!userRole) {
    return <Navigate to={ROUTES?.LOGIN} replace />;
  }
  if (isEmployee && userRole !== "E") {
    return <Navigate to={ROUTES?.C_OVERVIEW} replace />;
  }
  if (!isEmployee && userRole !== "C") {
    return <Navigate to={ROUTES?.E_OVERVIEW} replace />;
  }
  return children;
};

export default ProtectedRoute;
