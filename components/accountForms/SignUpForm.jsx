import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';

const initialFormState = {
	name: '',
	email: '',
	password: '',
};

const yupValidation = yup.object().shape({
	name: yup.string().required('Please enter a name'),
	email: yup.string().email().required('Please enter an email'),
	password: yup
		.string()
		.min(6, 'Should have at least 6 characters')
		.required('Please enter a password'),
});

const SignUpForm = () => {
	const router = useRouter();
	const auth = useAuth();

	//	State
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	return (
		<>
			<Formik
				initialValues={initialFormState}
				onSubmit={(values, { resetForm }) => {
					setIsLoading(true);
					setError(null);
					return auth.signUp(values).then(response => {
						setIsLoading(false);
						response.error ? setError(response.error) : router.push('/account');
					});
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
							{error?.message && (
								<div className="mb-4 text-red text-center border-dashed border border-red p-2 rounded">
									<span>{error.message}</span>
								</div>
							)}
							<Form.Input
								label="Name"
								placeholder="John Doe"
								onChange={handleChange}
								onBlur={handleBlur}
								name="name"
								value={values.name}
								error={
									touched.name &&
									errors.name && {
										content: errors.name,
										pointing: 'above',
									}
								}
							/>
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
							<Form.Input
								label="Password"
								type="password"
								placeholder="Password"
								onChange={handleChange}
								onBlur={handleBlur}
								name="password"
								value={values.password}
								error={
									touched.password &&
									errors.password && {
										content: errors.password,
										pointing: 'above',
									}
								}
							/>

							<div className="flex justify-center mt-14">
								<Form.Button onClick={handleSubmit} type="submit" primary>
									Sign up
								</Form.Button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default SignUpForm;
