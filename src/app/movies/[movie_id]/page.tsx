import React from 'react';
import Image from 'next/image';
import { getMovie } from '@/services/movieService';
import ContentDetails from '@/components/ContentDetails';
import MediaSlider from '@/components/MediaSlider';
import { getMovieDirector } from '@/utils/movieUtils';
import { Crew } from '@/types/Person';
import Rating from '@/components/Rating';

const getDirectorItem = (crew: Crew[]) => {
  const director = getMovieDirector(crew);

  if (typeof director === 'undefined') {
    return { img: '/unknown.jpeg', label: 'No director found', link: '' };
  }

  return {
    img: `${process.env.NEXT_PUBLIC_IMG_BASE_URL}/w185${director.profile_path}`,
    label: director.name,
    link: `/people/${director.id}`,
  };
};

interface MovieProps {
  params: {
    movie_id: number;
  };
}

export default async function Movie({ params }: MovieProps) {
  const {
    title,
    release_date,
    poster_path,
    overview,
    tagline,
    credits,
    homepage,
    imdb_id,
    vote_average,
    vote_count,
    genres,
  } = await getMovie(params.movie_id);

  const genresText = genres.map(({ name }) => name).join(', ');
  const cast = credits.cast.map(({ profile_path, name, id }) => ({
    link: `/people/${id}`,
    img: profile_path
      ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}/w185${profile_path}`
      : '/unknown.jpeg',
    label: name,
  }));
  const director = getDirectorItem(credits.crew);
  cast.unshift(director);

  return (
    <section className="container p-24 mx-auto">
      <h1 className="font-bold mt-30 text-2xl mb-7 text-gray-700 ">
        {title} ({release_date}) - {genresText}
      </h1>
      <div className="rounded-lg border-2 border-gray-600 p-4 shadow-lg shadow-gray-200">
        <div className="flex flex-row text-gray-700 ">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_BASE_URL}/w300${poster_path}`}
            alt=""
            width={300}
            height={700}
          />
          <div className="ml-5">
            {tagline && <i>&quot;{tagline}&quot;</i>}
            <ContentDetails title="Résumé du film" description={overview} />
            <div className="mt-5">
              {homepage && (
                <p>
                  <a
                    className="text-blue-400 underline"
                    href={homepage}
                    target="_blank"
                  >
                    Lien vers le site du film
                  </a>
                </p>
              )}
              <p>
                <a
                  className="text-blue-400 underline"
                  href={`https://www.imdb.com/title/${imdb_id}`}
                  target="_blank"
                >
                  Lien vers la page IMDB du film
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Rating
            voteAverage={vote_average}
            voteCount={vote_count}
            displayCount
          />
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-20 mb-5 text-xl text-gray-700 ">Crédits</h2>
        <div className="rounded-lg border-2 border-gray-600 p-4 shadow-lg shadow-gray-200">
          <MediaSlider items={cast} />
        </div>
      </div>
    </section>
  );
}
