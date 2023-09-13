import React, { useEffect, useState } from "react";
import axios from "../../settings/axios";
import requests from "../../settings/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          parseInt(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 class="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My list</button>

        </div>

        <h2 className="banner_description">
          {movie?.overview}
        </h2>
      </div>
      {/* div > 2 buttons */}
      {/* description */}
    </header>
  );
};

export default Banner;
