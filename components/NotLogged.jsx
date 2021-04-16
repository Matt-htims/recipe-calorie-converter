import React from 'react';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';

const NotLogged = () => {
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-backgroundWhite">
			<div className="bg-white shadow-xl rounded-2xl text-center m-4 max-w-2xl overflow-hidden md:mb-48 mb-20">
				<div className="h-full w-full flex items-center justify-center my-6">
					<img className="w-8/12" src="/login.svg" alt="" />
				</div>
				<div className="md:p-12 p-6">
					<h1 className="mb-8">You are not logged in</h1>
					<p>
						Login to be able to view this page or sign-up if you do not yet have
						an account.
					</p>
					<div className="space-x-5 mt-10">
						<Link href="/signup">
							<a>
								<Button basic secondary>
									Sign up
								</Button>
							</a>
						</Link>
						<Link href="/login">
							<a>
								<Button primary>Login</Button>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotLogged;
