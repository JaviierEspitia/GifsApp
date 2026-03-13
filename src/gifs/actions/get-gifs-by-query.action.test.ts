import { describe, test, expect, vi } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphyApi } from '../api/giphy.api';

import { giphySearchResponseMock } from '../../../test/mock/giphy.response.data';

describe('getGifsByQuery', () => {


  test('should return a list of gifs', async () =>{
    const mock = new AxiosMockAdapter(giphyApi);

    mock.onGet('/search').reply(200, giphySearchResponseMock);

    const gifs = await getGifsByQuery('goku');

    expect(gifs.length).toBe(10);

    gifs.forEach( gif => {
      expect( typeof gif.id ).toBe('string');
      expect( typeof gif.title ).toBe('string');
      expect( typeof gif.url ).toBe('string');
      expect( typeof gif.width ).toBe('number');
      expect( typeof gif.height ).toBe('number');

    });

  });

  test('should return an empty list of gifs if query is empty', async () =>{

    const gifs = await getGifsByQuery('');

    expect(gifs.length).toBe(0);

    
  });

  test('should handle error whe API returns an error', async () => {
    const mock = new AxiosMockAdapter(giphyApi);

    // the next line avoid show error in terminal
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mock.onGet('/search').reply(400, {
      data: {
        message: 'Bad request'
      }
    });

    const gifs = await getGifsByQuery('goku');

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

});

