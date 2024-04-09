import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	const backendURI = process.env.BACKEND_URL ?? "localhost:4055";

	const origin = process.env.API_ORIGIN as string;

	// protect api route with API-Key
	const apiKey = req.headers.get("x-api-key");
	if (apiKey !== process.env.NEXT_API_KEY) {
		return new NextResponse("Unauthorized", {
			status: 401,
			headers: {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": origin, //only respond to requests from this app's frontend
			},
		});
	}

	try {
		const body = await req.json();

		const result = await axios({
			url: `${backendURI}/graphql`,
			method: "post",
			data: JSON.stringify({
				query:
					"query IsMovieOnUserWatchList ($username: String!, $movieId: Int!){" +
					"   isMovieOnUserWatchList(username: $username, movieId: $movieId)" +
					"}",
				opreationName: "IsMovieOnUserWatchList",
				variables: { username: body.username, movieId: body.movieId },
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (result.data.data.isMovieOnUserWatchList) {
			console.log(
				"is movie on user watchlist api result ============>>>>>>>>>",
			);

			console.log(result.data);

			return new NextResponse(
				JSON.stringify({ result: result.data.data.isMovieOnUserWatchList }),
				{
					status: 200,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": origin,
					},
				},
			);
		}

		return new NextResponse("FAILED", {
			status: 500,
			headers: {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": origin,
			},
		});
	} catch (err) {
		console.log("error on find user watch history.");
		console.error(err);

		return new NextResponse("FAILED", {
			status: 500,
			headers: {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": origin,
			},
		});
	}
}
