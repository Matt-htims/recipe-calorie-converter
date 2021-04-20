import { useEffect } from 'react';
import { Button } from 'semantic-ui-react';

const DeleteConfirm = ({ action, discardFunc, cancelFunc }) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
	}, []);

	const handleScroll = () => {
		document.body.style.overflow = null;
	};
	return (
		<div className="">
			<div className="backdrop w-screen h-full absolute top-0 left-0">
				<div className="bg-gray-1000 opacity-50 z-10 h-full w-full"></div>
				<div className="flex justify-center">
					<div className="confirmation-box top-1/4 fixed z-20 bg-white shadow-xl px-5 py-10 md:p-6 rounded-lg w-10/12 md:w-2/4 h-64 space-y-8 object-center flex flex-col justify-between">
						<div className="top">
							<h3 className="font-sans text-2xl">{`${
								action.charAt(0).toUpperCase() + action.slice(1)
							} recipe`}</h3>
							<p>{`Are you sure you want to ${action} this recipe, you will lose it forever.`}</p>
						</div>
						<div className="bottom flex justify-end space-x-4">
							<Button
								onClick={() => {
									cancelFunc();
									handleScroll();
								}}
								basic
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									discardFunc();
									handleScroll();
								}}
								color="red"
							>{`${action.toUpperCase()}`}</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirm;
