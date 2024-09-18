import * as yup from "yup";

export const validationSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Invalid name format")
      .min(3, "min 3 characters required !")
      .required("username is required"),
  });
