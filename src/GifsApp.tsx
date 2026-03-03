import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";


export const GifsApp = () => {
  return (
    <>
      { /* Header */ }

      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el Gif perfecto"/>

      { /* Search */ }

      <SearchBar placeholder="Buscar gifs" />

      {/* Previous search */}

      <div className="previous-searches">
        <h2>Busquedas previas</h2>
        <ul className="previous-searches-list">
          <li>Goku</li>
          <li>Bubu</li>
          <li>Futbol</li>
        </ul>
      </div>

      { /* Gifs */ }

      
      <div className="gifs-container">
        {
          mockGifs.map((gif) => (
            <div key={ gif.id} className="gif-card">
              <img src={ gif.url } alt={gif.title} />
              <h3>{ gif.title }</h3>
              <p>
                { gif.width }x{ gif.height } (1.5mb)
              </p>
            </div>
          ))
        }
      </div>
        
    </>
  )
}
