import React from 'react';
import { revalidatePath } from 'next/cache';
import MovieList from '@/components/MovieList';
import { getGenres } from '@/services/genresService';
import { getMovies } from '@/services/movieService';
import { Genre, Movie, MovieFormatted } from '@/types/Movie';
import Pagination from '@/components/Pagination';

interface MoviesHomeProps {
  totalPages: number;
  results: MovieFormatted[];
}

interface HomeProps {
  searchParams?: {
    sortBy?: string;
    page?: string;
  };
}

const fetchMovies = async (
  page: string,
  sortBy: string
): Promise<MoviesHomeProps> => {
  const genres = await getGenres();
  const moviesPayload = await getMovies(page, sortBy);

  const movies = moviesPayload.results.map((movie) => {
    const movieGenres = movie.genre_ids.map((id) =>
      genres.find((genre) => genre.id === id)
    ) as Genre[];

    return { ...movie, genres: movieGenres };
  });

  return {
    totalPages: moviesPayload.total_pages,
    results: movies,
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const sortBy = searchParams?.sortBy || 'popularity.desc';
  const page = searchParams?.page || '1';

  const movies = await fetchMovies(page, sortBy);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 container mx-auto">
      <MovieList movies={movies.results} />
      <div className="flex justify-end mt-10 w-full">
        <Pagination page={Number(page)} totalPages={movies.totalPages} />
      </div>
    </main>
  );
}
