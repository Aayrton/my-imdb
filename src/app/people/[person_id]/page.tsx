import React from 'react';
import Image from 'next/image';
import ContentDetails from '@/components/ContentDetails';
import MediaSlider from '@/components/MediaSlider';
import { getPerson } from '@/services/personService';
import { MovieCreditsCrew, MovieCreditsCast } from '@/types/Person';
import { MediaSliderItem } from '@/components/MediaSlider';

function generateMediaSliderItems(
  credits: MovieCreditsCrew[] | MovieCreditsCast[]
): MediaSliderItem[] {
  return credits.map(({ poster_path, title, id }) => ({
    link: `/movies/${id}`,
    img: poster_path
      ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}/w185${poster_path}`
      : '/unknown.jpeg',
    label: title,
  }));
}
const getMediaSliderItems = (credits: {
  crew: MovieCreditsCrew[];
  cast: MovieCreditsCast[];
}) => {
  const crew = generateMediaSliderItems(credits.crew);
  const cast = generateMediaSliderItems(credits.cast);
  return cast.concat(crew);
};

interface PersonProps {
  params: {
    person_id: number;
  };
}

export default async function Person({ params }: PersonProps) {
  const {
    name,
    profile_path,
    biography,
    place_of_birth,
    birthday,
    known_for_department,
    movie_credits,
    imdb_id,
  } = await getPerson(params.person_id);
  const mediaSliderItems = getMediaSliderItems(movie_credits);

  return (
    <section className="container p-24 mx-auto">
      <h1 className="font-bold mt-30 text-2xl mb-7 text-gray-700">
        {name} ({known_for_department})
      </h1>
      <div className="rounded-lg border-2 border-gray-600 p-4 shadow-lg shadow-gray-100 text-gray-700">
        <div className="flex flex-row">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_BASE_URL}/w300${profile_path}`}
            alt=""
            width={300}
            height={450}
          />
          <div className="ml-5">
            <p>
              {birthday} <i>&quot;{place_of_birth}&quot;</i>
            </p>
            {biography && (
              <ContentDetails title="Biographie" description={biography} />
            )}
            <p className="mt-5">
              <a
                className="text-blue-400 underline"
                href={`https://www.imdb.com/name/${imdb_id}`}
                target="_blank"
              >
                Lien vers la page IMDB de la personne
              </a>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold mt-20 mb-5 text-xl">Crédits</h2>
        <div className="rounded-lg border-2 border-gray-600 p-4 shadow-lg shadow-gray-200 text-gray-700">
          <MediaSlider items={mediaSliderItems} />
        </div>
      </div>
    </section>
  );
}
