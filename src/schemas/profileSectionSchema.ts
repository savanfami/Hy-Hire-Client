import * as Yup from 'yup';



export const validationSchema:any = Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone is Required'),
      Instagram: Yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
        'Invalid Instagram URL'
      ),
    Twitter: Yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9._-]+\/?$/,
        'Invalid Twitter URL'
      ),
    LinkedIn: Yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9._-]+\/?$/,
        'Invalid LinkedIn URL'
      )
  });