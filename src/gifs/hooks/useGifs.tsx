import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";



export const useGifs = () => {
  
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  //const [previousGifs, setPreviousGifs] = useState(mockGifs)
  const [Gifs, setGifs] = useState<Gif[]>([])

  const handleTermClicked = async(term: string) => {
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
