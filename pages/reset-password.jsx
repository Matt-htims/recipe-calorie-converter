import Link from 'next/link';
import ResetPasswordForm from '../components/accountForms/ResetPasswordForm';

const ResetPassword = () => {
	return (
		<div className="min-h-screen flex bg-backgroundWhite">
			<div className="mt-8 mx-auto w-full max-w-md">
				<div className="text-center mt-24">
					<h2 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-medium">
						Reset password
					</h2>
					<p className="mt-2 text-center text-md text-gray-600">
						{"Didn't forget? "}
						<Link href="/login">
							<a href="#" className="text-blue-500">
								Login
							</a>
						</Link>
					</p>
				</div>
				<div className="mt-8 md:bg-white py-8 px-4 shadow-none md:shadow-md sm:rounded-lg sm:px-10">
					<ResetPasswordForm />
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
