"use client";
import Spinner from "@/icons/spinner";
import { uploadMovie } from "@/ui_controllers/submit.upload.movie.form";
import Link from "next/link";

const UploadMovie = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-black tw-relative tw-w-full">
				<div className=" tw-bg-yellow-900 tw-block tw-h-[80vh] tw-mt-12 tw-p-8 tw-rounded tw-shadow-md tw-w-full md:tw-w-[60vw] lg:tw-w-[40vw] tw-max-w-[500px]">
					<h2 className="tw-text-3xl tw-font-titillium_web tw-font-extrabold tw-text-yellow-400 tw-mb-4">
						Upload Movie
					</h2>
					<div className=" tw-max-h-[68vh] tw-overflow-y-auto">
						<form onSubmit={uploadMovie}>
							<div className="tw-mb-4">
								<label
									htmlFor="mov_title"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Title
								</label>
								<input
									type="text"
									id="mov_title"
									name="title"
									minLength={3}
									maxLength={200}
									className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-200"
									placeholder="into the badlands"
									required
								/>
							</div>

							<div className="tw-mb-4">
								<label
									htmlFor="mov_sum"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Summary
								</label>
								<textarea
									name="summary"
									id="mov_sum"
									cols={30}
									rows={10}
									className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-200"
									required></textarea>
							</div>

							<div className="tw-mb-4">
								<label
									htmlFor="mov_year"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Year
								</label>
								<input
									type="text"
									id="mov_year"
									name="year"
									minLength={4}
									maxLength={4}
									className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-200"
									placeholder="2020"
									required
								/>
							</div>
							<div className="tw-mb-4">
								<label
									htmlFor="mov_genre"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Genres
								</label>
								<input
									type="text"
									id="mov_genre"
									name="genres"
									className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-200"
									placeholder="action, crime, romance"
									required
								/>
							</div>

							<div className="tw-mb-4">
								<label
									htmlFor="mov_cast"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Main Casts
								</label>
								<input
									type="text"
									id="mov_cast"
									name="cast"
									className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-200"
									placeholder="Vin Diesel, Dwayne Johnson, Fevin Hart"
									required
								/>
							</div>

							<div className="tw-mb-4">
								<label
									htmlFor="mov_country"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Country
								</label>
								<input
									type="text"
									id="mov_country"
									name="country"
									className="tw-w-full tw-p-2 tw-border tw-text-black tw-border-yellow-300 tw-rounded focus:tw-outline-none focus:tw-border-yellow-200"
									placeholder="united states of america"
									required
								/>
							</div>

							<div className="tw-mb-4">
								<label
									htmlFor="cover_img"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Cover Image
								</label>
								<input
									type="file"
									id="cover_img"
									accept="image/*"
									name="cover_image"
									className="tw-w-full tw-p-2"
									required
								/>
							</div>

							<div className="tw-mb-4">
								<label
									htmlFor="vid_file"
									className="tw-block tw-text-gray-300 tw-text-sm tw-font-bold tw-font-titillium_web tw-mb-2">
									Video
								</label>
								<input
									type="file"
									id="vid_file"
									name="video"
									accept="video/*"
									className="tw-w-full tw-p-2"
									required
								/>
							</div>

							<button className="tw-w-full tw-bg-black tw-text-yellow-300 tw-font-titillium_web tw-text-center tw-font-semibold tw-py-2 tw-px-4 tw-rounded hover:tw-bg-gray-800 tw-transition tw-duration-300 tw-flex tw-justify-center tw-items-center">
								<span className=" tw-w-max tw-h-max tw-mr-3">Submit</span>
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
							upload movie failed
						</p>
					</div>
				</div>
				<Link
					href="/"
					className=" tw-absolute tw-top-10 tw-left-6 tw-font-bungee_shade tw-text-[40px] tw-text-yellow-600">
					MUVEES
				</Link>
			</div>
		</main>
	);
};

export default UploadMovie;
