import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import useAuth from 'src/hooks/useAuth';

type ProtectedProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedProps) {
  const { user, isOnBoarded } = useAuth();
  const location = useLocation();
  console.log(isOnBoarded);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (location.pathname !== '/welcome' && !isOnBoarded) {
    return <Navigate to="/welcome" replace />;
  }

  // if (userData) {
  //   const { onBoarded } = userData;

  //   if (location.pathname === '/welcome') {
  //     if (onBoarded) {
  //       return <Navigate to="/home" replace />;
  //     }
  //   } else {
  //     if (!onBoarded) {
  //       return <Navigate to="/welcome" replace />;
  //     }
  //   }
  // }

  return <>{children}</>;
}

export default ProtectedRoute;
