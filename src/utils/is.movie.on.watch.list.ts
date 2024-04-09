import axios from "axios";

export async function isMovieOnWatchList(
	movieId: number,
	username: string,
): Promise<boolean> {
	try {
		const result = await axios({
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "kjsopdshfk46873ndsjk0388kdmdsn8y32y85xnjsd873jd7yt4f",
			},
			data: JSON.stringify({ username, movieId }),
			url: "/api/is-movie-on-user-watchlist",
		});

		console.log("movie is on user watchlist result ============>>>>>>>>>>>>>");
		console.log(result.data);

		return result.data.result;
	} catch (error) {
		return false;
	}
}
