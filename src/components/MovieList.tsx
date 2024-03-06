'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import classnames from 'classnames';
import { MovieFormatted } from '@/types/Movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: MovieFormatted[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [isGridMode, setIsGridMode] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', e.target.value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="w-full">
      <div className="flex justify-end">
        <select
          aria-label="Sort By"
          className="px-4 py-2 bg-gray-200 rounded-md"
          onChange={handleSortChange}
        >
          <option value="popularity.desc">Trier par popularité</option>
          <option value="title.asc">Trier par ordre alphabétique</option>
        </select>
        <button
          className={`px-4 py-2 ${!isGridMode ? 'bg-yellow-200' : 'bg-gray-200'} rounded-md ml-5`}
          onClick={() => setIsGridMode(false)}
          disabled={!isGridMode}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${isGridMode ? 'bg-yellow-200' : 'bg-gray-200'} rounded-md ml-2`}
          onClick={() => setIsGridMode(true)}
          disabled={isGridMode}
        >
          Grid
        </button>
      </div>
      <div
        className={classnames('mt-10', {
          'grid grid-cols-5 gap-4': isGridMode,
          'flex flex-col w-full': !isGridMode,
        })}
      >
        {movies.map((movie, key) => (
          <MovieCard key={key} movie={movie} inlineDisplay={!isGridMode} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
