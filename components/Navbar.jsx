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
		<div className="bg-green flex justify-center z-40 sticky top-0">
			<nav className="flex items-center flex-wrap max-w-7xl w-full">
				<Link href="/">
					<a
						className="inline-flex items-center p-5 mr-4"
						onClick={closeDropDownHandler}
					>
						<span className="text-xl text-darkBlue font-accent font-extrabold">
							H+LTH
						</span>
					</a>
				</Link>
				<button
					className="inline-flex pr-5 rounded lg:hidden text-darkBlue ml-auto hover:text-darkBlue focus:outline-none"
					onClick={handleClick}
				>
					<img src={active ? '/menuOpen.svg' : '/menuClosed.svg'} alt="" />
				</button>
				<div
					className={`${
						active ? '' : 'hidden'
					}   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
				>
					<div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto lg:bg-green lg:shadow-none shadow-lg lg:space-y-0 space-y-3 lg:py-0 pb-3">
						<Link href="/recipes">
							<a
								onClick={closeDropDownHandler}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-darkBlue font-bold text-center hover:bg-green-light hover:text-darkBlue"
							>
								Recipes
							</a>
						</Link>
						<Link href="/planner">
							<a
								onClick={closeDropDownHandler}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-darkBlue font-bold text-center hover:bg-green-light hover:text-darkBlue"
							>
								Week Planner
							</a>
						</Link>
						<Link href="/account">
							<a
								onClick={closeDropDownHandler}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-darkBlue font-bold text-center hover:bg-green-light hover:text-darkBlue mr-5"
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
