import { Button } from 'semantic-ui-react';

const ErrorBox = ({ save }) => {
	return (
		<div className="border border-red rounded-xl p-8 space-y-4 ">
			<h3 className="text-center font-sans font-bold text-2xl text-red pb-4">
				There was an error getting the calories for this recipe
			</h3>
			<p>
				There could be an issue with the ingredients or with our server, please
				edit the ingredients and try to save again.
			</p>
			<p>
				If it still does not work then you can save it without the calories for
				now:
			</p>
			<div className="flex justify-center pt-4">
				<Button onClick={save} color="orange">
					Save without calories
				</Button>
			</div>
		</div>
	);
};

export default ErrorBox;
