import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<div className="font-sans bg-backgroundWhite h-screen">
			<Navbar />
			<main className="relative">{children}</main>
		</div>
	);
};

export default Layout;
