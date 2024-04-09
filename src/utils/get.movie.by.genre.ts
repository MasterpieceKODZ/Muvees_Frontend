import axios from "axios";

export async function getMovieByGenre(genre: string) {
	try {
		const result = await axios({
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "kjsopdshfk46873ndsjk0388kdmdsn8y32y85xnjsd873jd7yt4f",
			},
			data: JSON.stringify({ genre }),
			url: "/api/get-movie-by-genre",
		});

		return result.data;
	} catch (error) {
		return null;
	}
}
