/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const MovieCard = ({
	title,
	coverImageUrl,
	movieId,
}: {
	title: string;
	coverImageUrl: string;
	movieId: number;
}) => {
	return (
		<Link
			href={`/play/${movieId}/${title.split(" ").join("_")}`}
			className=" tw-w-max tw-h-max tw-mx-3 md:tw-mx-6">
			<div className=" tw-w-[12vw] tw-h-[18vw] tw-min-w-[120px] tw-min-h-[170px]  tw-rounded-lg tw-overflow-hidden">
				<img
					src={`${coverImageUrl.length < 10 ? "/pic.jpeg" : coverImageUrl}`}
					alt="cover image"
					className=" tw-object-cover tw-w-full tw-h-full"
				/>
			</div>
		</Link>
	);
};

export default MovieCard;
