import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): React.JSX.Element => <>{children}</>;