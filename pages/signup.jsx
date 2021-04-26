import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

import SignUpForm from '../components/accountForms/SignUpForm';

const Signup = () => {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (auth.user) {
			router.push('/account');
		}
	}, [auth.user]);
	return (
		<div className="min-h-screen flex bg-backgroundWhite">
			<div className="mt-8 mx-auto w-full max-w-md">
				<div className="text-center mt-24">
					<h2 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-medium">
						Sign up
					</h2>
					<p className="mt-2 text-center text-md text-gray-600">
						already have an account?{' '}
						<Link href="/login">
							<a href="#" className="text-blue">
								Log in
							</a>
						</Link>
					</p>
				</div>
				<div className="mt-8 md:bg-white py-8 px-4 w-full shadow-none md:shadow-md sm:rounded-lg sm:px-10">
					<SignUpForm />
				</div>
			</div>
		</div>
	);
};

export default Signup;
