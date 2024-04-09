import axios from "axios";

export async function getMovieByTitle(title: string) {
	try {
		const result = await axios({
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "kjsopdshfk46873ndsjk0388kdmdsn8y32y85xnjsd873jd7yt4f",
			},
			data: JSON.stringify({ title: title.toLowerCase().trim() }),
			url: "/api/get-movie-by-title",
		});

		return result.data;
	} catch (error) {
		return null;
	}
}
