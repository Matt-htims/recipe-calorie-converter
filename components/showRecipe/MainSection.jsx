import { Button } from 'semantic-ui-react';

const MainSection = ({
	title,
	servings,
	time,
	instructions,
	nutrition,
	info,
	openDelete,
	saveRecipe,
	saved,
}) => {
	return (
		<div className="md:w-3/4">
			<div className="bg-white shadow-xl px-5 py-10 md:p-7 rounded-2xl  space-y-10">
				<h2 className="text-center font-sans font-medium text-3xl">{title}</h2>
				{nutrition && (
					<div className="nutrition">
						<h2>nut</h2>
					</div>
				)}
				<div className="md:ml-11 md:mr-11">
					<div className="info flex justify-between">
						<div className="servings-time text-lg">
							<p>{`${servings} servings`}</p>
							<p>{`${time} mins total time`}</p>
						</div>
						<div className="icons grid grid-cols-2 gap-4">
							{info.vegetarian && (
								<img
									className="w-8 h-8"
									title="Vegetarian"
									src="/vegetarian.svg"
									alt="vegetarian"
								/>
							)}
							{info.vegan && (
								<img
									className="w-8 h-8"
									title="Vegan"
									src="/vegan.svg"
									alt="vegan"
								/>
							)}
							{info.glutenFree && (
								<img
									className="w-8 h-8"
									title="Gluten free"
									src="/glutenFree.svg"
									alt="Gluten free"
								/>
							)}
							{info.dairyFree && (
								<img
									className="w-8 h-8"
									title="Dairy free"
									src="/dairyFree.svg"
									alt="Dairy free"
								/>
							)}
						</div>
					</div>
				</div>
				<div className="instructions space-y-8">
					{instructions && (
						<>
							<h3 className="font-sans font-medium text-xl pb-2 md:ml-11">
								Instructions
							</h3>
							<div className="space-y-7">
								{instructions.map((instruction, index) => (
									<div key={`instruction-${index}`} className="flex">
										<div className="w-3">
											<p>{`${index + 1}.`}</p>
										</div>
										<p className="pl-8">{instruction}</p>
									</div>
								))}
							</div>
						</>
					)}
				</div>
				<>
					{saved ? (
						<div className="buttons flex justify-end space-x-4 md:mr-2">
							<div className="edit">
								<Button secondary basic>
									EDIT
								</Button>
							</div>
							<div className="delete">
								<Button onClick={openDelete} color="red" basic>
									DELETE
								</Button>
							</div>
						</div>
					) : (
						<div className="buttons flex justify-between md:ml-11 md:mr-11">
							<div className="discard">
								<Button onClick={openDelete} basic>
									DISCARD
								</Button>
							</div>
							<div className="edit-save flex md:block md:space-x-4">
								<Button secondary>EDIT</Button>
								<Button onClick={saveRecipe} primary>
									SAVE
								</Button>
							</div>
						</div>
					)}
				</>
			</div>
		</div>
	);
};

export default MainSection;
