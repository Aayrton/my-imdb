import { httpRequestWithAuth } from './httpService';
import { Person } from '@/types/Person';

const apiUrl = `${process.env.API_URL}/${process.env.API_VERSION}/person`;

export async function getPerson(personId: number): Promise<Person> {
  const payload: Person = await httpRequestWithAuth(
    `${apiUrl}/${personId}?language=${process.env.API_DEFAULT_LANG}&append_to_response=movie_credits`
  );

  return payload;
}
