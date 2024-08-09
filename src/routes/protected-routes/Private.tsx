import { Navigate, Outlet } from 'react-router-dom';

type roleCheckType = string | null;
type AccessTokenCheckType = string | null;
type RefreshTokenCheckType = string | null;
type SessionIdCheckType = string | null;

export const InitialRender = () => {
  const roleGet: roleCheckType = localStorage.getItem('role');
  const accessTokenGet: AccessTokenCheckType =
    localStorage.getItem('accessToken');
  const refreshTokenGet: RefreshTokenCheckType =
    localStorage.getItem('refreshToken');
  const sessionIdGet: SessionIdCheckType = localStorage.getItem('sessionId');

  const roleCheck = roleGet ? JSON.parse(roleGet) : null;
  const accessTokenCheck = accessTokenGet ? JSON.parse(accessTokenGet) : null;
  const refreshTokenCheck = refreshTokenGet
    ? JSON.parse(refreshTokenGet)
    : null;
  const sessionIdCheck = sessionIdGet ? JSON.parse(sessionIdGet) : null;

  if (roleCheck && accessTokenCheck && refreshTokenCheck && sessionIdCheck) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export const PrivateRouteForAdmin = () => {
  const roleGet: roleCheckType = localStorage.getItem('role');
  const roleCheck = roleGet ? JSON.parse(roleGet) : null;

  return roleCheck === 'ADMIN' ? <Outlet /> : <Navigate to="/login" />;
};

export const LoginCheckRoute = () => {
  const roleGet: roleCheckType = localStorage.getItem('role');
  const accessTokenGet: AccessTokenCheckType =
    localStorage.getItem('accessToken');
  const refreshTokenGet: RefreshTokenCheckType =
    localStorage.getItem('refreshToken');
  const sessionIdGet: SessionIdCheckType = localStorage.getItem('sessionId');

  const roleCheck = roleGet ? JSON.parse(roleGet) : null;
  const accessTokenCheck = accessTokenGet ? JSON.parse(accessTokenGet) : null;
  const refreshTokenCheck = refreshTokenGet
    ? JSON.parse(refreshTokenGet)
    : null;
  const sessionIdCheck = sessionIdGet ? JSON.parse(sessionIdGet) : null;

  if (roleCheck && accessTokenCheck && refreshTokenCheck && sessionIdCheck) {
    return <Navigate to="/home" />;
  } else {
    return <Outlet />;
  }
};
