export async function showAuthErrorText(text: string) {
	document.getElementById("auth_form_err_txt")?.classList.remove("tw-hidden");

	document.getElementById("auth_form_err_txt")!.textContent = text;
}

export async function hideAuthErrorText() {
	document.getElementById("auth_form_err_txt")?.classList.add("tw-hidden");
}
