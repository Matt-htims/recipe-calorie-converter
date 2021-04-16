import React from 'react';
import { Loader, Segment } from 'semantic-ui-react';

const LoaderComponent = () => (
	<div className="h-screen w-screen mt-32">
		<Loader active inline="centered" />
	</div>
);

export default LoaderComponent;
