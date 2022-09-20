import useAuth from "src/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type ProtectedProps = {
    children: any;
}

function ProtectedRoute({ children }: ProtectedProps) {
  const { user } = useAuth();

  if(!user) {
    return <Navigate to="/sign-in" replace />
  }

  return <>{children}</>;
}

export default ProtectedRoute;
