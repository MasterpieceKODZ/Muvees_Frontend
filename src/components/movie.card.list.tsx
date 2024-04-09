import { Movie } from "@/@types";
import MovieCard from "./movie.card";
import { Fragment } from "react";

const CardList = ({
	movieList,
	label,
}: {
	movieList: Movie[];
	label: string;
}) => {
	return (
		<div className=" tw-w-full tw-h-max !tw-pt-[30px]">
			<h2 className=" tw-font-titillium_web tw-text-[15px]  md:tw-text-[30px] tw-font-bold tw-text-start tw-block tw-px-6 tw-text-white">
				{label}
			</h2>
			<div className=" tw-w-full tw-max-w-full tw-overflow-x-auto tw-flex tw-items-center tw-justify-start tw-py-3 tw-mt-3 ">
				{movieList.map((movie) => {
					return (
						<Fragment key={movie.id}>
							<MovieCard
								title={movie.title as string}
								coverImageUrl={movie.coverImageUrl as string}
								movieId={movie.id as number}
							/>
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default CardList;
