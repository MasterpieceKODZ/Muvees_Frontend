import axios from "axios";

export async function updateUserWatchHistory(
	username: string,
	movieId: number,
) {
	try {
		axios({
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "kjsopdshfk46873ndsjk0388kdmdsn8y32y85xnjsd873jd7yt4f",
			},
			data: JSON.stringify({ username, movieId }),
			url: "/api/update-user-watch-history",
		});
	} catch (error) {
		console.log(
			"error occured on update user watchlist !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
		);
		console.log(error);
	}
}
