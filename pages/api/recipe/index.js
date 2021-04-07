import { withAuth } from '../../../config/withAuth';
import { addRecipe } from '../../../config/db-admin';

const handler = async (req, res) => {
	try {
		const { data } = await addRecipe(req.uid, req.body);
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};

export default withAuth(handler);
