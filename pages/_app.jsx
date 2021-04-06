import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';

import { AuthProvider } from '../hooks/useAuth';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	);
}

export default MyApp;
