import React from 'react';
import Link from 'next/link';

const IndivRecipe = ({ image, title, calories, id }) => {
	return (
		<>
			<Link href={`/recipes/${id}`}>
				<a className="flex space-x-4 shadow-lg w-11/12 rounded-xl overflow-hidden">
					<div className="max-w-xs w-3/12">
						<img className="" src={image} alt="" />
					</div>
					<div className="main flex flex-col justify-between md:mt-3 md:mb-5 my-1">
						<h4 className="font-sans font-normal md:text-xl text-sm text-gray-800">
							{title}
						</h4>
						<div className="calories flex items-end space-x-2">
							<p className="m-0 font-accent font-medium md:text-5xl text-xl text-gray-1000">
								{calories}
							</p>
							<p className="pb-1 md:text-base text-sm text-gray-900 ">
								calories
							</p>
						</div>
					</div>
				</a>
			</Link>
		</>
	);
};

export default IndivRecipe;
