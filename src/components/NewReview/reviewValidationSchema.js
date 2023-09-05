import * as yup from "yup";

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
