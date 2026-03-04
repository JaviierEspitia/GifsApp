import { GifList } from "./gifs/components/GifList";
import { mockGifs } from './mock-data/gifs.mock';
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useState } from "react";


export const GifsApp = () => {

  const [previousTerms, setPreviousTerms] = useState(['dragon ball']);

  const handleTermClicked = (term: string) => {
    console.log(term)
  }

  const handleSearch = ( query: string ) => {
    const trimmedQuery = query.trim();
    
    if(trimmedQuery.length == 0) return;

    const text = trimmedQuery.toLowerCase();

    if(previousTerms.includes(text)) return;

    if(previousTerms.length > 7) previousTerms.pop();
    
    setPreviousTerms([text, ...previousTerms]);

  }

  return (
    <>
      { /* Header */ }

      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el Gif perfecto"/>

      { /* Search */ }

      <SearchBar placeholder="Buscar gifs" onQuery = { handleSearch } />

      {/* Previous search */}

      <PreviousSearches searches={previousTerms} onLabelClicked = { handleTermClicked } />

      { /* Gifs */ }

      <GifList gifs={mockGifs} />
      
    </>
  )
}
