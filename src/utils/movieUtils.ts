import { Crew } from '@/types/Person';

export const getMovieDirector = (crew: Crew[]): Crew | undefined => {
  return crew.find((member) => member.job === 'Director');
};
