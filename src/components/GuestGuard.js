import { Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

// import useAuth from "src/hooks/useAuth";

function GuestGuard({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace={true}/>;
  }

  return <>{children}</>;
}

export default GuestGuard;
