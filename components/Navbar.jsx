import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
	const [active, setActive] = useState(false);

	const handleClick = () => {
		setActive(!active);
	};

	const closeDropDownHandler = () => {
		setActive(false);
	};
	return (
		<div className="bg-green flex justify-center z-40 sticky">
			<nav className="flex items-center flex-wrap p-3 max-w-7xl w-full">
				<Link href="/">
					<a
						className="inline-flex items-center p-2 mr-4"
						onClick={closeDropDownHandler}
					>
						<span className="text-xl text-darkBlue font-bold tracking-wide">
							Food
						</span>
					</a>
				</Link>
				<button
					className="inline-flex p-3 hover:bg-yellowishWhite rounded lg:hidden text-darkBlue ml-auto hover:text-darkBlue outline-none"
					onClick={handleClick}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<div
					className={`${
						active ? '' : 'hidden'
					}   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
				>
					<div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
						<Link href="/recipes/new">
							<a
								onClick={closeDropDownHandler}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-darkBlue font-bold items-center justify-center hover:bg-green-600 hover:text-darkBlue"
							>
								Add Recipe
							</a>
						</Link>
						<Link href="/recipes">
							<a
								onClick={closeDropDownHandler}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-darkBlue font-bold items-center justify-center hover:bg-green-600 hover:text-darkBlue"
							>
								Recipes
							</a>
						</Link>
						<Link href="/planner">
							<a
								onClick={closeDropDownHandler}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-darkBlue font-bold items-center justify-center hover:bg-green-600 hover:text-darkBlue"
							>
								Week Planner
							</a>
						</Link>
						<Link href="/account">
							<a
								onClick={closeDropDownHandler}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-darkBlue font-bold items-center justify-center hover:bg-green-600 hover:text-darkBlue"
							>
								My Account
							</a>
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
