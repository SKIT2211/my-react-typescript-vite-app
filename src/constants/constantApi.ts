// Access environment variable through import.meta.env
const AUTHENTICATION_URL: string | undefined = import.meta.env
  .VITE_AUTHENTICATION_URL;
const FAKE_SERVER_URL: string | undefined = import.meta.env
  .VITE_FAKE_SERVER_URL;

export const API = {
  LOGIN_USER: `${AUTHENTICATION_URL}/auth/signin`,
  LOGOUT_USER: `${AUTHENTICATION_URL}/auth/logout`,
  ALL_PRODUCTS: `${FAKE_SERVER_URL}/products`,
};
