import React, { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import { validationSchema } from '../../schemas/profileSectionSchema';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import debounce from 'lodash/debounce';
import { updateProfile } from '../../redux/action/userActions';

// Assuming you have an action to update user data
// import { updateUserData } from '../../redux/actions/userActions';

export const ProfileSocialLinkSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user: { data } } = useSelector((state: RootState) => state?.user);
  console.log(data)
  const initialValues = {
    phone: data.phone || '',
    Instagram: data?.socialLinks?.Instagram || '',
    LinkedIn: data?.socialLinks?.LinkedIn || '',
    Twitter: data?.socialLinks?.Twitter || ''
  };

  // Debounced save function to prevent too frequent API calls
  const debouncedSave = useCallback(
    debounce(async (newValues: FormikValues) => {
      console.log(newValues)
      const data={
        phone:newValues.phone,
        socialLinks:{
          Instagram:newValues.Instagram,
          Twitter:newValues.Twitter,
          LinkedIn:newValues.LinkedIn
        }
      }
      // dispatch(updateUserData(newValues));
      console.log('Saving:', data);
      await dispatch(updateProfile(data)).unwrap()
    }, 500),
    []
  );

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    values: FormikValues,
    validateField: (field: string) => Promise<void>,
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void
  ) => {
    const { name } = event.target;
    setFieldTouched(name, true, false);
    validateField(name).then(() => {
      // Only save if the field is valid
      if (!Object.keys(validationSchema.fields).includes(name) ||
        validationSchema.fields[name].isValidSync(values[name])) {
        debouncedSave(values);
      }
    });
  };

  return (
    <div className=" rounded px-8 pt-6 pb-8 mb-4 border border-gray-200 ">
      <h2 className="text-xl font-medium underline">Additional Details</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => { }}
      >
        {({ values, setFieldTouched, validateField }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data?.email}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                onBlur={(e: any) => handleBlur(e, values, validateField, setFieldTouched)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className=' h-6'>
                <ErrorMessage name='phone' className='text-red-600  ' component='div' />
              </div>
              </div>

            <div className="mb-4">
              <label htmlFor="Instagram" className="block text-gray-700 text-sm font-bold mb-2">
                Instagram
              </label>
              <Field
                type="text"
                id="Instagram"
                name="Instagram"
                onBlur={(e: any) => handleBlur(e, values, validateField, setFieldTouched)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
             <div className=' h-6'>
                <ErrorMessage name='Instagram' className='text-red-600  ' component='div' />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="LinkedIn" className="block text-gray-700 text-sm font-bold mb-2">
                LinkedIn
              </label>
              <Field
                type="text"
                id="LinkedIn"
                name="LinkedIn"
                onBlur={(e: any) => handleBlur(e, values, validateField, setFieldTouched)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className=' h-6'>
                <ErrorMessage name='LinkedIn' className='text-red-600  ' component='div' />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="Twitter" className="block text-gray-700 text-sm font-bold mb-2">
                Twitter
              </label>
              <Field
                type="text"
                id="Twitter"
                name="Twitter"
                onBlur={(e: any) => handleBlur(e, values, validateField, setFieldTouched)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className=' h-6'>
                <ErrorMessage name='Twitter' className='text-red-600  ' component='div' />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};