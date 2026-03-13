import { describe, expect, test, vi } from 'vitest';
import { useGifs } from './useGifs';
import { act, renderHook } from '@testing-library/react';

import * as gifActions from '../actions/get-gifs-by-query.action';


describe('useGifs', () => {

  test('should return values and methods',()=>{

    const { result } = renderHook(() => useGifs());

    expect(result.current.Gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();

  })

  test('should return a list of gifs', async ()=>{
    const { result } = renderHook(() => useGifs());
    
    await act(async ()=>{
      await result.current.handleSearch('Goku');
    })
    

    expect(result.current.Gifs.length).toBe(10);
  })

  test('should return a list of gifs when handleTermClicked is called', async ()=>{
    const { result } = renderHook(() => useGifs());
    
    await act(async ()=>{
      await result.current.handleTermClicked('Goku');
    })

    expect(result.current.Gifs.length).toBe(10);
  })

  test('should return a list of gifs from cache', async ()=>{
    const { result } = renderHook(() => useGifs());
    
    await act(async ()=>{
      await result.current.handleTermClicked('Mario');
    })

    expect(result.current.Gifs.length).toBe(10);

    await act(async ()=>{
      await result.current.handleTermClicked('Mario');
    })

    vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('This is my custom error'));

    expect(result.current.Gifs.length).toBe(10);

  })

  test('should return no more than 8 previous terms', async ()=>{
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);
    
    for (let i = 1; i <=9 ; i++) {
      await act(async ()=>{
        await result.current.handleSearch(`Mario${i}`);
      })
    }
    


    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      'mario9', 'mario8',
      'mario7', 'mario6',
      'mario5', 'mario4',
      'mario3', 'mario2'
    ])


  })


});