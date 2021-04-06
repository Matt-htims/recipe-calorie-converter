import { useRequireAuth } from '../hooks/useRequireAuth';

const Dashboard = () => {
	const auth = useRequireAuth();
	if (!auth.user) return null;
	return (
		<div className="min-h-screen flex bg-backgroundWhite">
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="text-center mt-24">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						{`Welcome ${auth.user.name}!`}
					</h2>
					<p className="mt-2 text-center text-md text-gray-600">
						{`You are logged in with ${auth.user.email}`}
					</p>
					<button
						onClick={() => auth.signOut()}
						className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
					>
						Sign out
					</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
