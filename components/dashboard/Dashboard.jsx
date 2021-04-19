import DashboardSection from './DashboardSection';

const Dashboard = () => {
	return (
		<div className="grid md:grid-cols-3 grid-cols-1 gap-4 my-20">
			<DashboardSection
				title="Add a recipe"
				image="/addRecipe.svg"
				pageLink="/recipes/new"
			/>
			<DashboardSection
				title="View all my recipes"
				image="/allRecipes.svg"
				pageLink="/recipes"
			/>
			<DashboardSection
				title="Plan out my week"
				image="/planWeek.svg"
				pageLink="/planner"
			/>
		</div>
	);
};

export default Dashboard;
