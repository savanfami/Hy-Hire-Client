import * as yup from "yup";

export const jobPostingValidationSchema = () =>
  yup.object().shape({
    jobTitle: yup
    .string()
    .required('Title is required')
    .test('not-only-spaces', 'Title cannot be only spaces', (value) => {
      return value !== undefined && value.trim() !== '';
    }),
    employmentType: yup
      .string()
      .min(3, "min 3 characters required !")
      .required("employmentType is required"),
    joblocation: yup
      .string()
      .required("location is required")
      .test('not-only-spaces', 'Title cannot be only spaces', (value) => {
        return value !== undefined && value.trim() !== '';
      }),
      experience:yup 
      .string()
      .required('experience is required')
      .test('not-only-spaces', 'Title cannot be only spaces', (value) => {
        return value !== undefined && value.trim() !== '';
      }),
      salaryMin: yup
    .number()
    .typeError('Minimum salary must be a number')
    .positive('Minimum salary must be positive')
    .test('is-not-just-zeros', 'Invalid amount', (value) => {
      if (value === undefined) return false;
      return !/^0+$/.test(value.toString());
    })
    .required('Minimum salary is required'),
  
  salaryMax: yup
    .number()
    .typeError('Maximum salary must be a number')
    .positive('Maximum salary must be positive')
    .test('is-not-just-zeros', 'Invalid amount', (value) => {
      if (value === undefined) return false;
      return !/^0+$/.test(value.toString());
    })
    .test('is-greater-than-min', 'Maximum salary must be greater than minimum salary', 
      function(value) {
        const min = this.parent.salaryMin;
        if (value === undefined || min === undefined) return false;
        return value > min;
      }
    ),
    jobDescription: yup.string().test(
      'is-filled',
      'Job description is required',
      function (value) {
          return !!value 
      }
  ),
      endDate: yup
      .date()
      .min(new Date(), 'End date must be today or a future date')
      .required('End date is required'),
      responsibilityInput: yup.array()
      .of(
        yup.string()
          .trim()
          .strict(true)
          .min(3, 'min 3 character')
          .test('not-only-spaces', 'Title cannot be only spaces', (value) => {
            return value !== undefined && value.trim() !== '';
          })
          .required('responsibility is required')
      )
      .min(1, 'at least one responsibility is required'),
      qualificationInput: yup.array()
      .of(
        yup.string()
          .trim()
          .strict(true)
          .min(3, 'min 3 character')
          .required('qualification is required')
      )
      .min(1,'At least one qualification is required'),
      skillInput: yup.array()
      .of(
        yup.string()
          .trim()
          .strict(true)
          .required('skills is required')

      )
      .min(1, 'At least one skill is required')
      .required('skills are required'),
  });
