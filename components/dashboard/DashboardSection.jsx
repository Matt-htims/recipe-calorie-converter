import React from 'react';
import Link from 'next/link';

const DashboardSection = ({ title, image, pageLink }) => {
	return (
		<>
			<Link href={pageLink}>
				<a>
					<div className="w-full h-96 bg-white rounded-xl shadow-lg flex flex-col hover:bg-gray-100 cursor-pointer">
						<div className="h-3/5  flex justify-center items-center p-10 mt-8">
							<img className="h-full" src={image} alt="" />
						</div>
						<h3>{title}</h3>
					</div>
				</a>
			</Link>
		</>
	);
};

export default DashboardSection;
