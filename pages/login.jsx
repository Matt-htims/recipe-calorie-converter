import Link from 'next/link';

import LoginForm from '../components/accountForms/LoginForm';

const LoginPage = () => {
	return (
		<div className="min-h-screen flex bg-backgroundWhite">
			<div className="mt-8 mx-auto w-full max-w-md">
				<div className="text-center mt-24">
					<h2 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-medium">
						Log in
					</h2>
					<p className="mt-2 text-center text-md text-gray-600">
						{"Don't have an account? "}
						<Link href="/signup">
							<a href="#" className="text-blue-500">
								Sign Up
							</a>
						</Link>
					</p>
				</div>
				<div className="mt-8 md:bg-white py-8 px-4 shadow-none md:shadow-md sm:rounded-lg sm:px-10">
					<LoginForm />
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
