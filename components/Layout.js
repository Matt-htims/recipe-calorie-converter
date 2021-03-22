import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<div className="font-sans bg-backgroundWhite h-screen">
			<Navbar />
			<main className="">{children}</main>
		</div>
	);
};

export default Layout;
