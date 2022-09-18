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
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchingInfo();
  }, []);

  return (
    <ErrorBondary>
      <div className="App">
        <h2>Splash Stock Image App </h2>
        <FaSearch />
        <Image />
      </div>
    </ErrorBondary>
  );
}

export default App;
