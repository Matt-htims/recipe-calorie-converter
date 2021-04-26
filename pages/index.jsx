import Link from 'next/link';

//	Components
import LargeNutritionBox from '../components/showRecipe/LargeNutritionBox';

export default function Home() {
	return (
		<div className="home">
			<div className="bg-green">
				<div className="banner mx-auto flex md:flex-row-reverse flex-col justify-between items-center px-6 md:px-20 lg:py-40 lg:px-10 md:py-32  max-w-7xl">
					<div className="image md:p-0 p-10 flex justify-center md:justify-end">
						<img className="w-10/12" src="/foodBowl.svg" alt="" />
					</div>
					<div className="banner-text flex md:block flex-col items-center">
						<h1 className="font-accent font-bold text-darkBlue lg:text-8xl text-7xl mb-7">
							HELTH
						</h1>
						<h2 className="font-sans text-darkBlue font-bold lg:text-2xl text-xl leading-8 mt-5 mb-4">
							Keep calorie tracking easy,
							<br /> You don't eat by the ingredient so why track by it?
						</h2>
						<p className="font-sans text-darkBlue font-medium lg:text-xl text-xl leading-8">
							Make an account to start your simplified calorie tracking journey!
						</p>
						<Link href="/signup">
							<a>
								<button className="font-sans text-yellowishWhite px-4 text-lg font-medium py-3 bg-darkBlue rounded-lg hover:bg-blue mt-9 mb-6">
									Create an account
								</button>
							</a>
						</Link>
						<div className="flex space-x-1">
							<p className="text-base font-sans font-medium mb-4">
								Already have an account?
							</p>
							<Link href="/login">
								<a>
									<p className="cursor-pointer font-medium text-blue font-sans text-base">
										Login
									</p>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="analyse-ingredients md:py-32 py-20">
				<h3 className="text-center font-accent font-bold text-darkBlue md:text-5xl text-3xl mb-6">
					Analyse by recipe not ingredient
				</h3>
				<p className="text-center text-sans md:text-xl text-sm font-medium">
					Break your favourite recipes down by calories and the three major
					macronutrients:
				</p>

				<div className="flex justify-center md:space-x-4 space-x-1 md:py-20 py-10 md:px-5 px-1">
					<LargeNutritionBox
						name="Calories"
						amount="603"
						unit="kcal"
						percent="30"
					/>
					<LargeNutritionBox name="Carbs" amount="80" unit="g" percent="27" />
					<LargeNutritionBox name="Protein" amount="20" unit="g" percent="40" />
					<LargeNutritionBox name="Fat" amount="42" unit="g" percent="61" />
				</div>
			</div>
		</div>
	);
}
