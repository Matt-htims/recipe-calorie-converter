import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { auth } from '../../../config/firebase';

//  Components
import EditRecipe from '../../../components/EditRecipe';

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
						axios({
							method: 'GET',
							url: `http://localhost:3000/api/recipe/${id}`,
							//	Just doing it to recipes api rather than recipe/[id] as no way of getting a specific recipe just the entire document of the user
							headers: { authorization: idToken },
						})
							.then(response => {
								console.log(response);
								console.log('success');
								setRecipe(response.data);
							})
							.catch(err => {
								setRecipe({ error: true });
								if (err.response) {
									//	Client received an error resonse (5xx, 4xx)
									console.log(err);
								} else if (err.request) {
									//	Client never received a response, or request never left
									console.log(err);
								} else {
									//	Anything else
									console.log(err);
								}
							});
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
