import { Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" replace={true}/>;
  }

  return <>{children}</>;
};

export default AuthGuard;
