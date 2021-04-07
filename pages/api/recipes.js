import { withAuth } from '../../config/withAuth';
import { showRecipes } from '../../config/db-admin';

const handler = async (req, res) => {
	try {
		const { data } = await showRecipes(req.uid);
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};

export default withAuth(handler);
