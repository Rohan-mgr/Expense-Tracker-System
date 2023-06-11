import * as yup from "yup";

let passwordRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=?])[a-zA-Z0-9!@#$%^&*-_=?]{8,}/g;

export const signInFormValidation = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export const signUpFormValidation = yup.object().shape({
  fName: yup.string().min(2).required("Please enter your first name"),
  lName: yup.string().min(2).required("Please enter your last name"),
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRegex, { message: "Please enter strong password" })
    .required("Please enter password"),
});
