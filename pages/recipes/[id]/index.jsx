import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';

//	Components
import Sidebar from '../../../components/showRecipe/Sidebar';
import MainSection from '../../../components/showRecipe/MainSection';
import DeleteConfirm from '../../../components/DeleteConfirm';
import Loader from '../../../components/Loader';
import NoRecipe from '../../../components/NoRecipe';
import NotLogged from '../../../components/NotLogged';

// Api requests
import getOne from '../../../apiFunctions/getOne';
import deleteOne from '../../../apiFunctions/deleteOne';

const IndividualRecipe = () => {
	const { user } = useAuth();
	const router = useRouter();

	const { id } = router.query;

	const [recipe, setRecipe] = useState({});
	const [loading, setLoading] = useState(true);
	const [deleteOpen, setDeleteOpen] = useState(false);

	//	Handlers for delete confirmation
	const handleOpenDelete = () => {
		setDeleteOpen(true);
	};

	const handleCloseDelete = () => {
		setDeleteOpen(false);
	};

	const handleRecipeShow = () => {
		console.log(recipe);
	};

	const handleDelete = () => {
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						deleteOne(idToken, id).then(() => router.push('/recipes'));
					})
					.catch(function (error) {
						// Handle error
					})
			: console.log('Not logged in', auth);
		setLoading(false);
	};

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
								console.error(err);
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
		<div className="min-h-screen pt-12">
			{deleteOpen && (
				<DeleteConfirm
					action="delete"
					discardFunc={handleDelete}
					cancelFunc={handleCloseDelete}
				/>
			)}

			<div className="w-11/12 m-auto space-y-0 md:space-y-12 max-w-7xl">
				<div className="main-section space-y-6 md:space-y-0 md:space-x-5 md:flex">
					<div className="md:w-1/4">
						<Sidebar img={recipe.image} ingredients={recipe.ingredients} />
					</div>

					<MainSection
						title={recipe.title}
						servings={recipe.servings}
						time={recipe.readyInMinutes}
						info={recipe.info}
						openDelete={handleOpenDelete}
						saved={true}
						instructions={recipe.instructions}
						nutrition={recipe.calorieInfo}
					/>
				</div>
			</div>
		</div>
	);
};

export default IndividualRecipe;
