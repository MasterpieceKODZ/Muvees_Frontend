/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Movie, User } from "@/@types";
import MovieCard from "@/components/movie.card";
import CardList from "@/components/movie.card.list";
import { updateUserWatchHistory } from "@/ui_controllers/update.user.watch.history";
import { getMoviesByCountry } from "@/utils/get.movie.by.country";
import { getMovieById } from "@/utils/get.movie.by.id";
import { getMovieByTitle } from "@/utils/get.movie.by.title";
import { isMovieOnWatchList } from "@/utils/is.movie.on.watch.list";
import { updateUserWatchlist } from "@/utils/update.user.watchlist";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlayIng = () => {
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState<Movie[]>([]);
	const [userRole, setUserRole] = useState("user");
	const [showSummary, setShowSummary] = useState(false);
	const [moreFromCountry, setMoreFromCountry] = useState<Movie[]>([]);
	const [onWatchList, setOnWatchList] = useState(true);

	const [movie, setMovie] = useState<Movie | null>(null);

	const params = useParams<{ movie_id: string; movie_title: string }>();

	let username = "";
	const router = useRouter();

	getSession().then((ses: any) => {
		if (!ses) router.push("/");
		username = ses.user.name;
	});

	useEffect(() => {
		(async () => {
			const ses = await getSession();
			setUserRole(ses?.user?.email as string);

			const mov = await getMovieById(Number(params.movie_id));

			setMovie(mov);

			setTimeout(async () => {
				const isMovieOnWatchListResult = await isMovieOnWatchList(
					Number(params.movie_id),
					ses?.user?.name as string,
				);

				setOnWatchList(isMovieOnWatchListResult);
			}, 100);

			setTimeout(async () => {
				const moreFromCountryResult = await getMoviesByCountry(
					mov?.countryOfOrigin as string,
				);

				console.log("more from country >>>>>>>>>>>>>>>>>>>>>>>");
				console.log(moreFromCountryResult);

				setMoreFromCountry(moreFromCountryResult);
			}, 200);
		})();
	}, []);
	return (
		<div className=" tw-w-screen tw-h-screen tw-bg-black tw-overflow-hidden tw-grid tw-grid-rows-[auto_1fr]">
			{/* navbar */}
			<div className=" tw-w-full tw-max-w-full tw-overflow-hidden tw-flex-wrap tw-h-max tw-py-2 tw-px-1 md:tw-px-5 tw-bg-black tw-flex tw-justify-center tw-items-center ">
				<div className="tw-w-[100%] md:tw-w-[30%] tw-h-max tw-flex tw-items-center tw-justify-start">
					<Link
						href="/"
						className=" tw-font-bungee_shade tw-text-[25px] md:tw-text-[40px] tw-text-yellow-600">
						MUVEES
					</Link>
				</div>
				<div className="tw-w-[100%]  md:tw-w-[70%] tw-h-max tw-flex tw-justify-between md:tw-justify-end tw-items-center tw-pe-[5px] md:tw-pe-[15px]">
					<div className=" tw-w-max tw-h-max tw-flex tw-justify-center tw-items-center tw-me-8">
						<input
							type="text"
							name="search"
							value={searchText}
							placeholder="search movie title"
							onChange={async (e) => {
								setSearchText(e.currentTarget.value);

								const result = await getMovieByTitle(searchText);

								setSearchResult(result);
							}}
							id=""
							className=" tw-text-white tw-bg-gray-800 tw-px-2 tw-py-1 tw-rounded"
						/>
					</div>
					<>
						{userRole == "admin" ? (
							<Link
								href="/upload-movie"
								className=" tw-text-gray-800 tw-bg-yellow-600 tw-px-4 tw-py-[1px] tw-ms-4 tw-me-8 tw-rounded tw-font-titillium_web tw-font-semibold tw-text-[17px]">
								Upload Movie
							</Link>
						) : (
							<></>
						)}
					</>

					<button
						className=" tw-text-yellow-600 tw-font-titillium_web tw-font-semibold tw-text-[16px]"
						onClick={() => signOut({ callbackUrl: `${location.origin}` })}>
						Log Out
					</button>
				</div>
			</div>
			{!searchText ? (
				<div className=" tw-w-screen tw-h-full tw-px-4 md:tw-px-9 tw-pb-10 tw-pt-2 tw-overflow-y-auto">
					{movie ? (
						<div>
							<div className=" tw-w-full tw-h-max tw-flex tw-justify-center tw-items-center tw-flex-col tw-py-2">
								<h1 className=" tw-font-ojuju tw-text-[20px] md:tw-text-[30px] tw-text-start tw-w-full tw-font-bold">
									{movie?.title?.toUpperCase()}
								</h1>
								<div className=" tw-w-full tw-mt-3">
									<p
										className={`" tw-font-titillium_web tw-text-gray-300 ${
											showSummary ? "" : "tw-h-[19px]"
										} tw-overflow-hidden tw-w-full"`}>
										{movie?.summary?.toLocaleLowerCase()}
									</p>

									<button
										onClick={() => {
											setShowSummary(!showSummary);
										}}
										className="  tw-font-bold tw-my-1 tw-text-gray-300">
										show {`${showSummary ? "less" : "more"}`}
									</button>
								</div>
								<p className=" tw-w-full tw-text-gray-600 tw-text-[13px] md:tw-text-[18px] tw-truncate tw-mt-2">
									{movie?.mainCasts?.join(", ").toLocaleLowerCase()}
								</p>
								<video
									src={`${
										movie && movie?.videoUrl!.length > 10
											? movie?.videoUrl
											: "https://muvees-storage.s3.amazonaws.com/videos/SampleVideo_1280x720_5mb.mp4"
									}`}
									controls
									className=" tw-block tw-w-full tw-h-[50vw] lg:tw-w-[70vw] lg:tw-h-[40vw] tw-max-h-[50vh]  tw-border-2 tw-border-gray-700 tw-py-3 tw-mt-7"
									onPlaying={() => {
										updateUserWatchHistory(username, Number(params.movie_id));
									}}></video>
								{onWatchList ? (
									<button
										className=" tw-w-max tw-h-max tw-px-6 tw-py-[2px] tw-font-titillium_web tw-text-[11px] tw-mt-6 tw-border-2 tw-border-yellow-500 tw-text-yellow-500 tw-rounded tw-block tw-self-start "
										onClick={() =>
											updateUserWatchlist(
												username,
												Number(params.movie_id),
												"remove",
												setOnWatchList,
											)
										}>
										Remove From Watchlist{" "}
									</button>
								) : (
									<></>
								)}
								{!onWatchList ? (
									<button
										className=" tw-w-max tw-h-max tw-px-6 tw-py-[2px] tw-font-titillium_web tw-text-[11px] tw-mt-6 tw-border-2 tw-border-yellow-500 tw-text-yellow-500 tw-rounded tw-block tw-self-start "
										onClick={() =>
											updateUserWatchlist(
												username,
												Number(params.movie_id),
												"add",
												setOnWatchList,
											)
										}>
										Add To Watchlist{" "}
									</button>
								) : (
									<></>
								)}
							</div>
							<div className=" tw-mt-8">
								<>
									{moreFromCountry && moreFromCountry.length > 0 ? (
										<CardList
											movieList={moreFromCountry}
											label={`MORE FROM ${movie.countryOfOrigin?.toUpperCase()}`}
										/>
									) : (
										<></>
									)}
								</>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
			<>
				{searchText ? (
					<div className=" tw-w-screen tw-min-h-full tw-overflow-y-auto tw-px-[30px] tw-pb-[80px]">
						<h2 className=" tw-font-titillium_web tw-text-[30px] tw-font-bold tw-text-start tw-block tw-px-6 tw-text-white">
							Search Result
						</h2>
						<div className=" tw-w-full tw-max-w-full tw-overflow-y-auto tw-flex tw-justify-start tw-items-start tw-flex-wrap tw-py-3 tw-mt-3 ">
							{searchResult && searchResult.length > 0 ? (
								searchResult.map((movie) => {
									return (
										<div
											className=" tw-w-max tw-h-max tw-mt-6 tw-mx-5"
											key={movie.id}>
											<MovieCard
												title={movie.title as string}
												coverImageUrl={movie.coverImageUrl as string}
												movieId={movie.id as number}
											/>
										</div>
									);
								})
							) : (
								<></>
							)}
						</div>
					</div>
				) : (
					<></>
				)}
			</>
		</div>
	);
};

export default PlayIng;
