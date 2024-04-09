import { FormEvent } from "react";
import { hideAuthSpinner, showAuthSpinner } from "./show.hide.spinner";
import { validateFormInput } from "@/utils/validate.signup.form.input.value";
import { hideAuthErrorText, showAuthErrorText } from "./show.hide.error.text";
import { signIn } from "next-auth/react";

export async function submitSignInForm(e: FormEvent) {
	e.preventDefault();

	showAuthSpinner();

	const username = (
		document.getElementById("login_username") as HTMLInputElement
	).value.trim();

	const password = (
		document.getElementById("login_password") as HTMLInputElement
	).value.trim();

	if (!(await validateFormInput(username, password))) {
		hideAuthSpinner();
		return;
	}

	hideAuthErrorText();

	// initiate nextauth sign in
	const signInResult = await signIn("credentials", {
		callbackUrl: `${location.origin}/workspace/projects-list`,
		redirect: false,
		username: username,
		password: password,
	});

	if (signInResult?.status == 200) {
		// sign in was successful
		hideAuthSpinner();
		location.assign("/movies-dashboard");
	} else {
		// a user with that email address is not found or password is wrong
		hideAuthSpinner();
		showAuthErrorText("authentication failed.");

		return false;
	}
}
