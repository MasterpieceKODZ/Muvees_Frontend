import { ChangeEvent } from "react";
import { hideAuthErrorText, showAuthErrorText } from "./show.hide.error.text";

export async function validateUsername(e: ChangeEvent) {
	const usernameValue = (e.currentTarget as HTMLInputElement).value;

	if (/[^a-zA-Z0-9_@$+]/gi.test(usernameValue)) {
		showAuthErrorText("invalid username");

		return;
	}

	hideAuthErrorText();
}

export async function validatePassword(e: ChangeEvent) {
	const passwordValue = (e.currentTarget as HTMLInputElement).value;

	if (/\s/gi.test(passwordValue)) {
		showAuthErrorText("invalid password");

		return;
	}

	hideAuthErrorText();
}
