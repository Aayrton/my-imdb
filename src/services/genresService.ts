import { httpRequestWithAuth } from '@/services/httpService';
import { Genre } from '@/types/Movie';

const apiUrl = `${process.env.API_URL}/${process.env.API_VERSION}/genre`;

export async function getGenres(): Promise<Genre[]> {
  const payload = await httpRequestWithAuth<{ genres: Genre[] }>(
    `${apiUrl}/movie/list?language=${process.env.API_DEFAULT_LANG}`
  );

  return payload.genres;
}
