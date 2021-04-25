import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../hooks/useAuth';

import { auth } from '../../../config/firebase';

//  Components
import EditRecipe from '../../../components/EditRecipe';
import Loader from '../../../components/Loader';
import NoRecipe from '../../../components/NoRecipe';
import NotLogged from '../../../components/NotLogged';

//	Api requests
import getOne from '../../../apiFunctions/getOne';

const Edit = () => {
	const router = useRouter();
	const { id } = router.query;

	const { user } = useAuth();

	//  State
	const [recipe, setRecipe] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		setLoading(true);
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						getOne(idToken, id)
							.then(response => {
								setRecipe(response);
								mounted ? setLoading(false) : '';
							})
							.catch(err => {
								mounted ? setLoading(false) : '';
							});
					})
					.catch(function (error) {
						mounted ? setLoading(false) : '';
					})
			: console.log('Not logged in');
		setTimeout(() => {
			mounted ? setLoading(false) : '';
		}, 3000);
		return function cleanup() {
			mounted = false;
		};
	}, [auth.currentUser, user]);

	if (loading) return <Loader />;
	if (!recipe.title) return <NoRecipe />;
	return (
		<div className="w-11/12 md:w-9/12 m-auto mt-12 space-y-0 md:space-y-12 max-w-7xl">
			<h1 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-bold">
				Edit your recipe
			</h1>
			<div className="bg-white shadow-xl px-5 py-10 md:p-12 rounded-2xl">
				<EditRecipe recipe={recipe} />
			</div>
		</div>
	);
};

export default Edit;
