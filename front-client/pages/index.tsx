import { FormEvent } from "react";

export default function Home() {

const handleSearch = (event:FormEvent) => {
  event.preventDefault();
}

  return (
      <div id="home">
        <header>
          <h1>Le Cercle des Energies Nouvelles de Soin</h1>

          <div className="searchBack">
            <h2>Rechecher une : formation</h2>
            <div className="search">
              <form onSubmit={(event) => handleSearch(event)}>
                <input type="text" className="searchBar" name="what" id="what" placeholder="Que recherchez vous ? " />
                <input type="text" className="localisationBar" name="where" id="where" placeholder="Saissisez une ville ou une region" />
                <button className="submit" type="submit"><p className="medium">RECHERCHER</p></button>
              </form>
            </div>
          </div>
        </header>
      </div>
  );
}
