export async function showAuthSpinner() {
	document.getElementById("auth_spinner")?.classList.remove("tw-hidden");
}

export async function hideAuthSpinner() {
	document.getElementById("auth_spinner")?.classList.add("tw-hidden");
}
