import React from 'react';
import { Button } from 'semantic-ui-react';

const DeleteConfirm = ({ action, discardFunc, cancelFunc }) => {
	return (
		<div className="">
			<div className="backdrop w-screen h-screen bg-gray-1000 opacity-50 absolute bottom-0 z-10"></div>
			<div className="flex justify-center">
				<div className="confirmation-box top-1/4 absolute z-20 bg-white shadow-xl px-5 py-10 md:p-6 rounded-2xl w-10/12 md:w-2/4 h-64 space-y-8 object-center flex flex-col justify-between">
					<div className="top">
						<h3 className="font-sans text-2xl">{`${
							action.charAt(0).toUpperCase() + action.slice(1)
						} recipe`}</h3>
						<p>{`Are you sure you want to ${action} this recipe, you will lose it forever.`}</p>
					</div>
					<div className="bottom flex justify-end space-x-4">
						<Button onClick={cancelFunc} basic>
							Cancel
						</Button>
						<Button
							onClick={discardFunc}
							color="red"
						>{`${action.toUpperCase()} RECIPE`}</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirm;
