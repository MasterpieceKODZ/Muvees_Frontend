import { FormEvent } from "react";
import { showAuthSpinner } from "./auth/show.hide.spinner";

export async function uploadMovie(e: FormEvent) {
	e.preventDefault();

	showAuthSpinner();

	const title = (
		document.getElementById("mov_title") as HTMLInputElement
	).value.trim();
	const summary = (
		document.getElementById("mov_sum") as HTMLInputElement
	).value.trim();
	const year = (
		document.getElementById("mov_year") as HTMLInputElement
	).value.trim();
	const genres = (
		document.getElementById("mov_genre") as HTMLInputElement
	).value.trim();
	const mainCasts = (
		document.getElementById("mov_cast") as HTMLInputElement
	).value.trim();

	const country = (
		document.getElementById("mov_country") as HTMLInputElement
	).value.trim();

	const coverImage = (document.getElementById("cover_img") as HTMLInputElement)
		.files![0];

	const video = (document.getElementById("vid_file") as HTMLInputElement)
		.files![0];
}
