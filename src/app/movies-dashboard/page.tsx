/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Movie } from "@/@types";
import MovieCard from "@/components/movie.card";
import CardList from "@/components/movie.card.list";
import { getMovieByGenre } from "@/utils/get.movie.by.genre";
import { getMovieByTitle } from "@/utils/get.movie.by.title";
import { getUserWatchHistory } from "@/utils/get.user.watch.history";
import { getUserWatchList } from "@/utils/get.user.watch.list";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const MoviesDashboard = () => {
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState<Movie[]>([]);
	const [watchHistory, setWatchHistory] = useState<Movie[] | null>(null);
	const [watchList, setWatchList] = useState<Movie[] | null>(null);

	const [romanceMovies, setRomanceMovies] = useState<Movie[] | null>(null);

	const [actionMovies, setActionMovies] = useState<Movie[] | null>(null);

	const [crimeMovies, setCrimeMovies] = useState<Movie[] | null>(null);

	const [animMovies, setAnimMovies] = useState<Movie[] | null>(null);
	const [userRole, setUserRole] = useState("user");

	const router = useRouter();
	getSession().then((ses: any) => {
		if (!ses) router.push("/");
	});

	useEffect(() => {
		(async () => {
			const session = await getSession();

			setUserRole(session?.user?.email as string);

			const userWatchHist = await getUserWatchHistory(
				session?.user?.name as string,
			);

			setWatchHistory(userWatchHist);

			const userWatchList = await getUserWatchList(
				session?.user?.name as string,
			);

			setWatchList(userWatchList);

			const romanceMov = await getMovieByGenre("romance");

			console.log("romance movie =>..............");
			console.log(romanceMov);

			setRomanceMovies(romanceMov);

			const actionMov = await getMovieByGenre("action");

			console.log("action movie =>..............");
			console.log(actionMov);

			setActionMovies(actionMov);

			const crimeMov = await getMovieByGenre("crime");

			console.log("crime movie =>..............");
			console.log(crimeMov);

			setCrimeMovies(crimeMov);

			const animMov = await getMovieByGenre("animation");

			console.log("animation movie =>..............");
			console.log(animMov);

			setAnimMovies(animMov);
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
			<>
				{!searchText ? (
					<div className=" tw-w-screen tw-min-h-full tw-overflow-y-auto tw-px-[30px] tw-pb-[80px]">
						<>
							{watchHistory && watchHistory.length > 0 ? (
								<CardList
									movieList={watchHistory}
									label="Watch History"
								/>
							) : (
								<></>
							)}
						</>
						<>
							{watchList && watchList.length > 0 ? (
								<CardList
									movieList={watchList}
									label="Watch List"
								/>
							) : (
								<></>
							)}
						</>
						<>
							{romanceMovies && romanceMovies.length > 0 ? (
								<CardList
									movieList={romanceMovies}
									label="Romance"
								/>
							) : (
								<></>
							)}
						</>

						<>
							{actionMovies && actionMovies.length > 0 ? (
								<CardList
									movieList={actionMovies}
									label="Action"
								/>
							) : (
								<></>
							)}
						</>
						<>
							{crimeMovies && crimeMovies.length > 0 ? (
								<CardList
									movieList={crimeMovies}
									label="Crime"
								/>
							) : (
								<></>
							)}
						</>

						<>
							{animMovies && animMovies.length > 0 ? (
								<CardList
									movieList={animMovies}
									label="Animation"
								/>
							) : (
								<></>
							)}
						</>
					</div>
				) : (
					<></>
				)}
			</>
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

export default MoviesDashboard;
