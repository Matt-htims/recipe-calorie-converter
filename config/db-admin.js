import { firestore } from './firebase-admin';

export async function showRecipes(uid) {
	const data = await firestore
		.collection('recipes')
		.where('userId', '==', uid)
		.get()
		.then(querySnapshot => {
			const recipes = [];
			querySnapshot.forEach(doc => {
				recipes.push(doc.data());
			});
			return recipes;
		})
		.catch(error => {
			console.log('Error getting documents: ', error);
		});

	return { data };
}

export async function showRecipe(uid, recipeId) {
	const data = await firestore
		.collection('recipes')
		.doc(recipeId)
		.get()
		.then(doc => {
			if (doc.exists && uid === doc.data().userId) {
				return doc.data();
			} else {
				console.log('No such document!');
			}
		})
		.catch(error => {
			console.error('Error getting document: ', error);
		});

	return { data };
}

export async function addRecipe(uid, body) {
	const data = await firestore
		.collection('recipes')
		.doc(body.id)
		.set(body)
		.then(() => {
			console.log('Document successfully written');
		})
		.catch(error => {
			console.error('Error writing document: ', error);
		});

	return { data };
}

export async function removeRecipe(id) {
	const data = await firestore
		.collection('recipes')
		.doc(id)
		.delete()
		.then(() => {
			console.log('Document successfully deleted');
		})
		.catch(error => {
			console.error('Error removing document: ', error);
		});

	return { data };
}

export async function editRecipe(id, body) {
	const data = await firestore
		.collection('recipes')
		.doc(id)
		.update(body)
		.then(() => {
			console.log('Document successfully updated!');
		})
		.catch(error => {
			console.error('Error updating document: ', error);
		});

	return { data };
}

// Not in use yet but should work for deleting all recipes to do with a user account
export async function deleteAllUserRecipes(uid) {
	const data = await firestore
		.collection('recipes')
		.where('userId', '==', uid)
		.delete()
		.then(() => {
			console.log('All recipes for this user successfully deleted');
		})
		.catch(error => {
			console.error('Error deleting user recipes: ', error);
		});

	return { data };
}
