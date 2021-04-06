import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';

const initialFormState = {
	email: '',
};

const yupValidation = yup.object().shape({
	email: yup.string().email().required('Please enter an email'),
});

const ResetPasswordForm = () => {
	const auth = useAuth();
	const router = useRouter();
	return (
		<>
			<Formik
				initialValues={initialFormState}
				onSubmit={(values, { resetForm }) => {
					auth.sendPasswordResetEmail(values.email);
					router.push('/login');
				}}
				validationSchema={yupValidation}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => {
					return (
						<Form>
							<Form.Input
								label="Email"
								placeholder="johndoe@gmail.com"
								onChange={handleChange}
								onBlur={handleBlur}
								name="email"
								value={values.email}
								error={
									touched.email &&
									errors.email && {
										content: errors.email,
										pointing: 'above',
									}
								}
							/>

							<div className="flex justify-center mt-14">
								<Form.Button onClick={handleSubmit} type="submit" color="vk">
									Send reset link
								</Form.Button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default ResetPasswordForm;
