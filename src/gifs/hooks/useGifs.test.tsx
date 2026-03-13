import { describe, expect, test } from 'vitest';
import { useGifs } from './useGifs';
import { act, renderHook } from '@testing-library/react';


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
      await result.current.handleTermClicked('Mario');
    })

    expect(result.current.Gifs.length).toBe(10);
  })


});