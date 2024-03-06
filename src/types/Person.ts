import { Movie } from './Movie';

type KnownForDepartment =
  | 'Acting'
  | 'Directing'
  | 'Writing'
  | 'Production'
  | 'Sound'
  | 'Camera'
  | 'Art'
  | 'Costume & Make-Up'
  | 'Creator'
  | 'Visual Effects'
  | 'Lighting'
  | 'Crew'
  | 'Editing'
  | 'Sound';

type Job =
  | 'Director'
  | 'Screenplay'
  | 'Producer'
  | 'Executive Producer'
  | 'Sound Re-Recording Mixer';

export interface Credit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Cast extends Credit {
  cast_id: number;
  character: string;
  order: number;
}

export interface Crew extends Credit {
  credit_id: string;
  department: string;
  job: Job;
}

export interface MovieCreditsCrew extends Movie {
  credit_id: string;
  department: string;
  job: Job;
}

export interface MovieCreditsCast extends Movie {
  cast_id: number;
  character: string;
  order: number;
}

export interface Person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: KnownForDepartment;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  movie_credits: { crew: MovieCreditsCrew[]; cast: MovieCreditsCast[] };
}
