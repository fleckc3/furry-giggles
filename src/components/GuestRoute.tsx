import useAuth from 'src/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

type GuestRouteProps = {
  children: ReactNode;
};

function GuestRoute({ children }: GuestRouteProps) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
}

export default GuestRoute;
