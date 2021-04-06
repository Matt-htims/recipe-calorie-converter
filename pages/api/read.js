import { auth } from '../../config/firebase-admin';

export default async (req, res) => {
	if (!req.headers.token) {
		return res.status(401).json({ error: 'Please include id token' });
	}

	try {
		const { uid } = await auth.verifyIdToken(req.headers.token);
		req.uid = uid;
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}

	// more authorization checks based on uid
	// business logic
};
