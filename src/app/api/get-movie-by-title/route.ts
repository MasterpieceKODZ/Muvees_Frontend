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
					"query MovieByTitle ($title: String!){" +
					"   getMoviesByTitle(title: $title){" +
					"        id " +
					"        title " +
					"        coverImageUrl " +
					"   }" +
					"}",
				opreationName: "MovieByTitle",
				variables: { title: body.title },
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (result.data.data.getMoviesByTitle)
			return new NextResponse(
				JSON.stringify(result.data.data.getMoviesByTitle),
				{
					status: 200,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": origin,
					},
				},
			);
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
