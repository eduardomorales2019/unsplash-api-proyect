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
  const [page, setPage] = useState(1);

  // ===========SET FETCHING
  const fetchingInfo = async () => {
    setLoading(true);
    let urlpage = `&page=${page}`;
    let url = `${mainUrl}${clientIdENV}${urlpage}`;

    try {
      // const response = await fetch(url);

      const { data } = await axios(url);

      // SET THE FUNTION AS WE SCROLL DOWN WE INSERT THAT DATA AND THE NEW DATA., OLD AND NEW..
      //  COPY OF OLD IMAGES AND THEN A COPY OF THE DATA.. ALL IN AND ARRAY..
      setImages((oldimages) => {
        return [...oldimages, ...data];
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // FETCH THE IMAGES, WHEN THE PAGE CHANGES, THAT MEAN IF WE SET THE PAGE IN DE DEPENDENCY ARRAY
  React.useEffect(() => {
    fetchingInfo();
  }, [page]);

  // useEfect for images at scroll down!
  // use effect is good for  set  eventlisteners.
  React.useEffect(() => {
    // window object from javascript use for now the pixers in our inner window to detect the scrool.
    const event = window.addEventListener("scroll", () => {
      //  if loading is not there,  the set up that we are try in to avoid is when i hot the bottom, keep fetching the data.-
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldpage) => {
          return oldpage + 1;
        });
      }
    });

    return () => window.removeEventListener("scroll", event);
  }, []);
  // ==========0
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hola ");
  };

  return (
    <ErrorBondary>
      <main>
        <h2 className="h2-title">unSplash-App </h2>
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
