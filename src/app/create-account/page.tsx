"use client";
import Spinner from "@/icons/spinner";
import { submitCreateAccountForm } from "@/ui_controllers/auth/create.account";
import {
	validatePassword,
	validateUsername,
} from "@/ui_controllers/auth/validate.sign.up.form";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAccount() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	getSession().then((ses: any) => {
		if (ses) router.push("/movies-dashboard");
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-black tw-relative">
				<div className=" tw-bg-yellow-900 tw-p-8 tw-rounded tw-shadow-md tw-w-full tw-max-w-md">
					<h2 className="tw-text-3xl tw-font-titillium_web tw-font-extrabold tw-text-yellow-400 tw-mb-4">
						Create Account
					</h2>
					<form onSubmit={submitCreateAccountForm}>
						<div className="tw-mb-4">
							<label
								htmlFor="signup_username"
								className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
								Username
							</label>
							<input
								type="text"
								id="signup_username"
								maxLength={20}
								minLength={3}
								name="username"
								onChange={validateUsername}
								className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-200"
								placeholder="Enter your username"
							/>
						</div>
						{/* password */}
						<div className="tw-mb-6">
							<label
								htmlFor="signup_password"
								className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
								Password
							</label>
							<div className="tw-relative">
								<input
									type={showPassword ? "text" : "password"}
									id="signup_password"
									name="password"
									maxLength={50}
									minLength={8}
									onChange={validatePassword}
									className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-500 tw-pr-10"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									className="tw-absolute tw-inset-y-0 tw-right-0 tw-pr-3 tw-flex tw-items-center"
									onClick={togglePasswordVisibility}>
									{showPassword ? (
										<svg
											className="tw-h-5 tw-w-5 tw-text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									) : (
										<svg
											className="tw-h-5 tw-w-5 tw-text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M2 12s3 8 6 10M22 12s-3 8-6 10"></path>
										</svg>
									)}
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="tw-w-full tw-bg-black tw-text-yellow-300 tw-font-titillium_web tw-text-center tw-font-semibold tw-py-2 tw-px-4 tw-rounded hover:tw-bg-gray-800 tw-transition tw-duration-300 tw-flex tw-justify-center tw-items-center">
							<span className=" tw-w-max tw-h-max tw-mr-3">Sign Up</span>
							<span
								id="auth_spinner"
								className=" tw-hidden">
								<Spinner size={25} />
							</span>
						</button>
					</form>
					<p
						id="auth_form_err_txt"
						className=" tw-font-titillium_web tw-text-[15px] tw-text-yellow-200 tw-text-center tw-mt-3 tw-hidden">
						your username or password contains invalid characters
					</p>
				</div>
				<Link
					href="/"
					className=" tw-absolute tw-top-10 tw-left-6 tw-font-bungee_shade tw-text-[40px] tw-text-yellow-600">
					MUVEES
				</Link>
			</div>
		</main>
	);
}
