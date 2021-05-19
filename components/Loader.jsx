import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoaderComponent = () => (
	<div className="h-screen w-screen mt-32">
		<Loader active inline="centered" />
	</div>
);

export default LoaderComponent;
