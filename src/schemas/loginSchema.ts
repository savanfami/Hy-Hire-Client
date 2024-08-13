import * as yup from 'yup'

export const loginSchema=()=>yup.object().shape({
    email:yup
    .string()
    .matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, "Invalid email format")
    .email("Invalid email")
    .required("email is required"       
    ),
    password:yup
    .string()
    .required("Password is required")
    .min(8,"Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
})