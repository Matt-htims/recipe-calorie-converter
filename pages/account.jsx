import { useRequireAuth } from '../hooks/useRequireAuth';
import { Button } from 'semantic-ui-react';

import NotLogged from '../components/NotLogged';

const Account = () => {
	const auth = useRequireAuth();

	if (!auth.user) return <NotLogged />;
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

					<Button onClick={() => auth.signOut()} primary>
						Sign out
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Account;
