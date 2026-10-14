import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@services/store';
import type { RootState } from '@services/store';
import { Preloader } from '@ui';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false,
}: ProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();

  const user = useSelector((state: RootState) => state.user.user);
  const isAuthChecked = useSelector(
    (state: RootState) => state.user.isAuthChecked
  );

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};