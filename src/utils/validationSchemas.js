import * as yup from "yup";

// Base schema for both SignIn and SignUp
const baseValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username should be between 5 to 30 characters long.")
    .max(30, "Username should be between 5 to 30 characters long.")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password should be between 5 to 50 characters long.")
    .max(50, "Password should be between 5 to 50 characters long.")
    .required("Password is required"),
});

// SignIn schema (using the base)
export const signInValidationSchema = baseValidationSchema;

// SignUp schema (expanding upon the SignIn schema)
export const signUpValidationSchema = baseValidationSchema.concat(
  yup.object().shape({
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  })
);

const reviewValidationSchema = yup.object().shape({
  ownerUsername: yup
    .string()
    .required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating should be between 0 and 100")
    .max(100, "Rating should be between 0 and 100"),
  review: yup.string(),
});

export default reviewValidationSchema;
