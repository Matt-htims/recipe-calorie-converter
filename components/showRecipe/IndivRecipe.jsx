import React from 'react';
import Link from 'next/link';

const IndivRecipe = ({ image, title, calories, id }) => {
	return (
		<>
			<Link href={`/recipes/${id}`}>
				<a className="flex md:space-x-6 space-x-3 shadow-lg w-11/12 rounded-xl overflow-hidden md:h-64 h-40">
					<div className="max-w-xs w-4/12 flex-none">
						<img className="object-cover h-full w-full" src={image} alt="" />
					</div>
					<div className="main flex flex-col justify-between md:mt-3 md:mb-4 my-1 pr-1">
						<h4 className="font-sans font-normal md:text-2xl text-base text-gray-800">
							{title}
						</h4>
						<div className="calories flex items-end space-x-2">
							<p className="m-0 font-accent font-normal md:text-7xl text-5xl text-gray-1000">
								{calories}
							</p>
							<p className="pb-1 md:pb-2 md:text-xl text-sm text-gray-900 ">
								{calories ? 'calories' : ''}
							</p>
						</div>
					</div>
				</a>
			</Link>
		</>
	);
};

export default IndivRecipe;
