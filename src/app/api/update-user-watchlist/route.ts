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

		let result;

		console.log("update user watchlist action =++++++++++++++==========");
		console.log(body.action);

		if (body.action == "remove") {
			const removeResult = await axios({
				url: `${backendURI}/graphql`,
				method: "post",
				data: JSON.stringify({
					query:
						"query RemoveFromWatchList ($username: String!,$id: Int!){" +
						"   removeMovieFromWatchList(username: $username, movieId: $id){" +
						"        id " +
						"        title " +
						"   }" +
						"}",
					opreationName: "RemoveFromWatchList",
					variables: { username: body.username, movieId: Number(body.movieId) },
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			result = removeResult.data.data.removeMovieFromWatchList;
		} else {
			const addResult = await axios({
				url: `${backendURI}/graphql`,
				method: "post",
				data: JSON.stringify({
					query:
						"query AddToWatchList ($username: String!,$id: Int!){" +
						"   addMovieToWatchList(username: $username, movieId: $id){" +
						"        id " +
						"        title " +
						"   }" +
						"}",
					opreationName: "AddToWatchList",
					variables: { username: body.username, movieId: Number(body.movieId) },
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			result = addResult.data.data.addMovieToWatchList;
		}

		if (!result.data.error)
			return new NextResponse(JSON.stringify("SUCCESS"), {
				status: 200,
				headers: {
					"Content-Type": "text/string",
					"Access-Control-Allow-Origin": origin,
				},
			});
		return new NextResponse("FAILED", {
			status: 500,
			headers: {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": origin,
			},
		});
	} catch (err) {
		console.log("error on update user watchlist.");
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
