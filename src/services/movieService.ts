import { httpRequestWithAuth } from './httpService';
import { Movie, MovieDetails, MoviesResponse } from '../types/Movie';

const apiUrl = `${process.env.API_URL}/${process.env.API_VERSION}/movie`;

export async function getMovies(
  page: string,
  sortBy: string
): Promise<MoviesResponse> {
  const payload: MoviesResponse = await httpRequestWithAuth(
    `${apiUrl}/now_playing?/discover/movie?include_adult=false&include_video=false&page=${page}&sort_by=${sortBy}&with_release_type=2|3language=${process.env.API_DEFAULT_LANG}`
  );

  return payload;
}

export async function getMovie(movieId: number): Promise<MovieDetails> {
  const payload: MovieDetails = await httpRequestWithAuth(
    `${apiUrl}/${movieId}?language=${process.env.API_DEFAULT_LANG}&append_to_response=credits`
  );

  return payload;
}

export async function getCredits(movieId: number): Promise<MovieDetails> {
  const payload: MovieDetails = await httpRequestWithAuth(
    `${apiUrl}/${movieId}/credits?language=${process.env.API_DEFAULT_LANG}`
  );

  return payload;
}
