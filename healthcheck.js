const http = require("http");

const options = {
	port: 3000,
	host: "localhost",
	timeout: 2000,
	path: "/api/healthcheck",
};

const request = http.request(options, (res) => {
	const exitCode = res.statusCode === 200 ? 0 : 1;
	process.exit(exitCode);
});

request.on("error", (err) => {
	console.log("container is unhealthy");

	process.exit(1);
});

request.end();
