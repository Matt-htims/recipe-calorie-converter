import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { auth } from '../../../config/firebase';

//  Components
import EditRecipe from '../../../components/EditRecipe';

//	Api requests
import getOne from '../../../api/getOne';

const Edit = () => {
	const router = useRouter();
	const { id } = router.query;
	//  State
	const [recipe, setRecipe] = useState({});
	useEffect(() => {
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						getOne(idToken, id).then(response => setRecipe(response));
					})
					.catch(function (error) {
						// Handle error
					})
			: console.log('Not logged in', auth);
	}, []);

	return (
		<div className="w-11/12 md:w-9/12 m-auto mt-12 space-y-0 md:space-y-12 max-w-7xl">
			<h1
				onClick={() => console.log(recipe)}
				className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-bold"
			>
				edit
			</h1>
			<div className="bg-white shadow-xl px-5 py-10 md:p-12 rounded-2xl">
				{recipe.title && <EditRecipe recipe={recipe} />}
			</div>
		</div>
	);
};

export default Edit;
