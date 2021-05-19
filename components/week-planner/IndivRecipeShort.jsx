import { useState } from 'react';
import Link from 'next/link';

//	Zustand state
import { weekPlannerState } from '../../zustand-state/plannerDayState';

const IndivRecipeShort = ({ image, title, id, day, meal }) => {
	//	Zustand state action
	const removeMeal = weekPlannerState(s => s.removeMeal);

	//	State
	const [buttonsOpen, setButtonsOpen] = useState(false);

	//	Handlers
	const handleButtonOpen = () => {
		setButtonsOpen(!buttonsOpen);
	};

	const handleRemoveRecipe = () => {
		removeMeal(day, meal, id);
	};

	function truncateText(text, length) {
		if (text.length <= length) {
			return text;
		}
		return text.substr(0, length) + '\u2026';
	}

	return (
		<div
			className={`rounded-lg hover:shadow-lg hover:bg-white overflow-hidden mb-2 ${
				buttonsOpen ? 'shadow-lg bg-white' : ''
			}`}
		>
			<div
				onClick={handleButtonOpen}
				className="rounded-lg overflow-hidden flex h-24 cursor-pointer"
			>
				<div className="w-4/12 flex-none">
					<img className="object-cover h-full w-full" src={image} alt="" />
				</div>
				<div>
					<h3 className="font-sans text-lg text-gray-900 pl-3 pt-1">
						{truncateText(title, 30)}
					</h3>
				</div>
			</div>
			{buttonsOpen ? (
				<div className="flex justify-around py-4 bg-gray-100">
					<button
						onClick={handleRemoveRecipe}
						className="py-1 px-3 rounded-md font-accent font-normal text-base hover:bg-red hover:text-white"
					>
						Delete
					</button>
					<Link href={`/recipes/${id}`}>
						<a>
							<button className="py-1 px-3 border border-gray-900 text-base rounded-md font-accent font-normal hover:bg-darkBlue hover:text-white">
								View
							</button>
						</a>
					</Link>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default IndivRecipeShort;
