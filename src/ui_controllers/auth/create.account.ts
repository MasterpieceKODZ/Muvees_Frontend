import { validateFormInput } from "@/utils/validate.signup.form.input.value";
import { FormEvent } from "react";
import { hideAuthErrorText, showAuthErrorText } from "./show.hide.error.text";
import { hideAuthSpinner, showAuthSpinner } from "./show.hide.spinner";

export async function submitCreateAccountForm(e: FormEvent) {
	e.preventDefault();

	showAuthSpinner();

	const username = (
		document.getElementById("signup_username") as HTMLInputElement
	).value.trim();

	const password = (
		document.getElementById("signup_password") as HTMLInputElement
	).value.trim();

	if (!(await validateFormInput(username, password))) {
		hideAuthSpinner();
		return;
	}

	hideAuthErrorText();

	try {
		const createUserRes = await fetch("/api/create-account", {
			body: JSON.stringify({ username, password }),
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "kjsopdshfk46873ndsjk0388kdmdsn8y32y85xnjsd873jd7yt4f",
			},
			cache: "no-store",
		});

		if (createUserRes.ok) {
			location.assign("/");
		} else {
			if ((await createUserRes.text()) == "DUPLICATE_USER_CREDENTIALS")
				showAuthErrorText("the username is taken");
			else showAuthErrorText("authentication failed");

			hideAuthSpinner();

			return;
		}
	} catch (error) {
		console.log("error in create user..");
		console.log(error);

		showAuthErrorText("authentication failed");
		hideAuthSpinner();

		return;
	}
}
