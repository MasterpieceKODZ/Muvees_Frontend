import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: Response) {
	const backendURI = process.env.BACKEND_URL ?? "localhost:4055";

	const origin = process.env.API_ORIGIN;

	// protect api route with API-Key
	const apiKey = req.headers.get("x-api-key");
	if (apiKey !== process.env.NEXT_API_KEY) {
		return new NextResponse("Unauthorized", {
			status: 401,
			headers: {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": origin as string, //only respond to requests from this app's frontend
			},
		});
	}

	try {
		const body = await req.json();

		console.log("next create account body ");

		console.log(body);
		console.log("next create account origin ");

		console.log(backendURI);

		const createdUserRes = await axios({
			method: "post",
			url: `${backendURI}/auth/create-account`,
			data: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
		});

		console.log("created user");
		console.log(createdUserRes);

		if (createdUserRes.status != 200) {
			return new NextResponse(JSON.stringify("FAILD"), {
				status: 500,
				headers: {
					"Access-Control-Allow-Origin": backendURI,
					"Content-Type": "text/plain",
				},
			});
		}
		return new NextResponse(JSON.stringify(createdUserRes.data), {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": backendURI,
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.log("error on create acoount api");
		console.log(error);

		return new NextResponse("INTERNAL_SERVER_ERROR", {
			status: 500,
			headers: {
				"Access-Control-Allow-Origin": backendURI,
				"Content-Type": "text/plain",
			},
		});
	}
}
