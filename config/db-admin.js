import { firestore } from './firebase-admin';
import firebase from 'firebase/app';
import { db } from './firebase';

export async function getUserSites(uid) {
	const snapshot = await firestore
		.collection('ghost_sites')
		.where('authorId', '==', uid)
		.get();

	const sites = [];

	snapshot.forEach(doc => {
		sites.push({ id: doc.id, ...doc.data() });
	});

	sites.sort((a, b) =>
		compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
	);

	return { sites };
}

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
			if (doc.exists) {
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
