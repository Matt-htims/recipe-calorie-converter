import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<div className="font-main">
			<Navbar />
			<main className="">{children}</main>
		</div>
	);
};

export default Layout;
