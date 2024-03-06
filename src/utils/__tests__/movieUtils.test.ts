//@ts-nocheck
import '@testing-library/jest-dom';
import { getMovieDirector } from '../movieUtils';

describe('movieUtils', () => {
  describe('getMovieDirector', () => {
    it('should return the director of the movie', () => {
      const crew = [
        { name: 'Director 1', job: 'Director' },
        { name: 'Actor 1', job: 'Actor' },
        { name: 'Actor 2', job: 'Actor' },
      ];

      const director = getMovieDirector(crew);

      expect(director).toEqual({ name: 'Director 1', job: 'Director' });
    });

    it('should return undefined if no director is found', () => {
      const crew = [
        { name: 'Actor 1', job: 'Actor' },
        { name: 'Actor 2', job: 'Actor' },
      ];

      const director = getMovieDirector(crew);

      expect(director).toBeUndefined();
    });
  });
});
