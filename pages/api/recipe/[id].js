import { withAuth } from '../../../config/withAuth';
import { removeRecipe, editRecipe, showRecipe } from '../../../config/db-admin';

const handler = async (req, res) => {
	const { id } = req.query;
	switch (req.method) {
		case 'DELETE':
			try {
				const { data } = await removeRecipe(id);
				return res.status(200).json(data);
			} catch (error) {
				console.log(error);
				return res.status(500).json({ error: error.message });
			}
		case 'PUT':
			try {
				const { data } = await editRecipe(id, req.body);
				return res.status(200).json(data);
			} catch (error) {
				console.log(error);
				return res.status(500).json({ error: error.message });
			}
		case 'GET':
			try {
				const { data } = await showRecipe(req.uid, id);
				return res.status(200).json(data);
			} catch (error) {
				console.log(error);
				return res.status(500).json({ error: error.message });
			}
	}
};

export default withAuth(handler);
