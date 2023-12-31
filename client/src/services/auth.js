import { AUTH_ENDPOINT } from "../utils/endpoint";
import { httpAuth } from "../utils/http";

export const handleUserSignup = async (credentials) => {
  const URL = AUTH_ENDPOINT.signUp;
  console.log(URL);
  const response = await httpAuth.post(URL, JSON.stringify(credentials));
  return response;
};
export const handleUserSignin = async (credentials) => {
  const URL = AUTH_ENDPOINT.signIn;
  console.log(URL);
  const response = await httpAuth.post(URL, JSON.stringify(credentials));
  console.log(response);
  return response;
};

export const handleGoogleAuthLogin = async () => {
  const URL = AUTH_ENDPOINT.getGoogleUser;
  console.log(URL);
  const response = await httpAuth.get(URL, { withCredentials: true });
  return response;
};
export const handlegoogleAuthLogout = async () => {
  const URL = AUTH_ENDPOINT.googleLogOut;
  console.log(URL);
  const response = await httpAuth.get(URL);
  return response;
};
