import React from 'react';
import Link from 'next/link';
import { MovieFormatted } from '../types/Movie';
import Image from 'next/image';
import Rating from './Rating';
import classNames from 'classnames';

interface MovieCardProps {
  movie: MovieFormatted;
  inlineDisplay: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie: { poster_path, title, vote_average, id, vote_count, genres },
  inlineDisplay,
}) => {
  return (
    <Link
      href={`/movies/${id}`}
      className={classNames(
        'p-4 text-gray-700 rounded-lg border-4 border-gray-200 bg-white hover:border-yellow-200 transition-all duration-300 ease-in-out',
        {
          'flex mb-5': inlineDisplay,
        }
      )}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE_URL}/w300${poster_path}`}
        alt=""
        width={300}
        height={450}
      />
      <div
        className={classNames({
          'ml-5': inlineDisplay,
        })}
      >
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        {genres && genres.length && !inlineDisplay && <p>{genres[0].name}</p>}
        {genres && genres.length && inlineDisplay && (
          <p>{genres.map((genre) => genre.name).join(', ')}</p>
        )}
        <Rating voteAverage={vote_average} voteCount={vote_count} />
      </div>
    </Link>
  );
};

export default MovieCard;
