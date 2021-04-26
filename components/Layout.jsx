import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
	return (
		<div className="font-sans bg-backgroundWhite h-full">
			<Navbar />
			<main className="relative">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
