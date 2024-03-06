import { httpRequest, httpRequestWithAuth } from '../httpService';

describe('httpService', () => {
  global.fetch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('httpRequest', () => {
    it('should return the data', async () => {
      jest
        .spyOn(global, 'fetch')
        .mockImplementationOnce(
          jest.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve('OK') })
          ) as jest.Mock
        );

      const result = await httpRequest('test');

      expect(result).toEqual('OK');
    });

    it('should throw an error', async () => {
      jest.spyOn(global, 'fetch').mockImplementationOnce(
        jest.fn(() =>
          Promise.resolve({
            status: 'Not Good!',
            ok: false,
            json: () => Promise.resolve(''),
          })
        ) as jest.Mock
      );

      await expect(httpRequest('test')).rejects.toThrow();
    });
  });
});
