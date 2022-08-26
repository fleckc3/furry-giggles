import { Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

// import useAuth from "src/hooks/useAuth";

function GuestGuard({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={{ pathname: "/dashboard" }} />;
  }

  return <>{children}</>;
}

export default GuestGuard;
