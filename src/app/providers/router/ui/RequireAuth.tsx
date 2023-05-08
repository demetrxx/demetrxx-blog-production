import { useSelector } from 'react-redux';
import { getUserAuthData, getUserRoles } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement, useMemo } from 'react';
import { RoutePath } from 'shared/config/router/routeConfig';
import { UserRole } from 'entities/User/model/types/UserSchema';

interface RequireAuthProps {
  children: ReactElement
  roles?: UserRole[]
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
  }

  return children;
};
