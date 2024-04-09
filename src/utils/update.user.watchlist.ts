import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { isMovieOnWatchList } from "./is.movie.on.watch.list";

export async function updateUserWatchlist(
	username: string,
	movieId: number,
	action: "remove" | "add",
	setOnWatchlist: Dispatch<SetStateAction<boolean>>,
) {
	try {
		const result = await axios({
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "kjsopdshfk46873ndsjk0388kdmdsn8y32y85xnjsd873jd7yt4f",
			},
			data: JSON.stringify({ username, movieId, action }),
			url: "/api/update-user-watchlist",
		});

		setOnWatchlist(await isMovieOnWatchList(movieId, username));
	} catch (error) {
		console.log(
			"error occured on update user watchlist !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
		);
		console.log(error);

		return null;
	}
}
