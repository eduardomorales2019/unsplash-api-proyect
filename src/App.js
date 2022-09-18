import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import Image from "./image";
import axios from "axios";
import ErrorBondary from "./ErrorBondary";
// =========
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const clientIdENV = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

//api.unsplash.com/?https: client_ID = xBkFLQz7oczyPM8EoxbT5tB83ZhEMqC6qABrVwKcFxI;
// variable de entorno
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

function App() {
  // ==states.

  const [loading, setLoading] = useState(false);
  const [image, setImages] = useState([]);

  const fetchingInfo = async () => {
    setLoading(true);
    let url;
    url = `${mainUrl}${clientIdENV}`;

    try {
      // const response = await fetch(url);

      const { data } = await axios(url);
      setImages(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchingInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hola ");
  };

  return (
    <ErrorBondary>
      <main>
        <h2 className="h2-title">unSplash-App- Exercice </h2>
        <section className="search">
          <form className="search-form">
            <input type="text" placeholder="search" className="form-input" />
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              <FaSearch />
            </button>
          </form>
          {/* <Image /> */}
        </section>
        <section className="photos">
          <div className="photos-center">
            {image.map((images, index) => {
              return <Image key={index} {...images} />;
            })}
          </div>
          {loading && <h2 className="loading">Loading... </h2>}
        </section>
      </main>
    </ErrorBondary>
  );
}

export default App;
