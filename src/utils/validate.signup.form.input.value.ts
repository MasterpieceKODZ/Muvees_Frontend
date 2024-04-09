import { showAuthErrorText } from "@/ui_controllers/auth/show.hide.error.text";

export async function validateFormInput(username: string, password: string) {
	if (!username || !password) {
		showAuthErrorText("input username and password");

		return false;
	}

	// return an false if username or password contains invalid characters
	if (/[^a-zA-Z0-9_@$+]/gi.test(username) || /\s/gi.test(password)) {
		showAuthErrorText("your username or password contains invalid characters");

		return false;
	}

	return true;
}
