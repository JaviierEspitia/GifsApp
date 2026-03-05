import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";


const gifsCache: Record<string, Gif[]> = {};


export const useGifs = () => {
  
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  //const [previousGifs, setPreviousGifs] = useState(mockGifs)
  const [Gifs, setGifs] = useState<Gif[]>([])

  // key string and value Gif[]
  
  const handleTermClicked = async(term: string) => {
    if( gifsCache[term] ){
      setGifs(gifsCache[term])
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs)
  }

  const handleSearch = async ( query: string ) => {
    const trimmedQuery = query.trim();
    
    if(trimmedQuery.length == 0) return;

    const text = trimmedQuery.toLowerCase();

    if(previousTerms.includes(text)) return;

    if(previousTerms.length > 7) previousTerms.pop();
    
    setPreviousTerms([text, ...previousTerms]);

    const gifs = await getGifsByQuery(query)

    setGifs(gifs)

    gifsCache[query] = gifs;

  }
  
  return (
    {
      // Properties
      Gifs,
      // Methods
      previousTerms,
      handleTermClicked,
      handleSearch
    }
  )
}
