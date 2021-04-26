import Link from 'next/link';

const Footer = () => {
	return (
		<div className="bg-darkBlue text-yellowishWhite mt-4 p-16 font-sans">
			<div className="flex justify-center space-x-6 h-12 mb-10">
				<img src="/social-media/facebook.svg" alt="" />
				<img src="/social-media/instagram.svg" alt="" />
				<img src="/social-media/twitter.svg" alt="" />
			</div>
			<div className="space-x-6 flex justify-center my-4">
				<Link href="/login">
					<a className="text-white hover:text-blue">Login</a>
				</Link>
				<Link href="/signup">
					<a className="text-white hover:text-blue">Signup</a>
				</Link>
				<Link href="/account">
					<a className="text-white hover:text-blue">Account</a>
				</Link>
			</div>
			<div className="space-x-6 flex justify-center">
				<Link href="/recipes/new">
					<a className="text-white hover:text-blue">Add Recipes</a>
				</Link>
				<Link href="/recipes">
					<a className="text-white hover:text-blue">Recipes</a>
				</Link>
				<Link href="/planner">
					<a className="text-white hover:text-blue">Week Planner</a>
				</Link>
			</div>
		</div>
	);
};

export default Footer;
