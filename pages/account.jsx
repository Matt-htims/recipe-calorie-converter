import { useAuth } from '../hooks/useAuth';
import { Button } from 'semantic-ui-react';

//	Components
import NotLogged from '../components/NotLogged';
import Dashboard from '../components/dashboard/Dashboard';

const Account = () => {
	const auth = useAuth();

	if (!auth.user) return <NotLogged />;
	return (
		<div className="min-h-screen flex bg-backgroundWhite">
			<div className="mt-8 mx-auto w-full max-w-7xl px-4">
				<div className="text-center md:mt-16">
					<div className="w-44 mx-auto">
						<img src="/chef.svg" alt="" />
					</div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						{`Welcome ${auth.user.name ? auth.user.name : ''}!`}
					</h2>
					<p className="mt-2 text-center text-md text-gray-600">
						{`You are logged in with ${auth.user.email}`}
					</p>
					<Dashboard />

					<Button onClick={() => auth.signOut()} primary>
						Sign out
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Account;
