const ErrorPage = () => {
	return (
		<div className=" tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
			<h1 className=" tw-w-max tw-text-center tw-font-titillium_web">Oops!</h1>
			<p className=" tw-text-center tw-font-mono tw-mt-5">
				an error occured click <a href="/">here</a> to go back
			</p>
		</div>
	);
};

export default ErrorPage;
