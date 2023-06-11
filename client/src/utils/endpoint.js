import { config } from "../config";

export const AUTH_ENDPOINT = {
  signUp: config.baseURL + "/user/signup",
  signIn: config.baseURL + "/user/signin",
};
