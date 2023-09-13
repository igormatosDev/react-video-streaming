import React, { useState, useEffect } from "react";
import axios from "../../settings/axios";
import './Row.css';


const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        // if [], run once when row loads, and dont run again
        // if [movies], run always that movies variable changes

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // everytime I use an external variable (as fetchUrl), it should be present in the
        // requirements array below []. It's necessary because when the value changes, it'll
        // refresh the value for different blocks.
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        src={base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)}
                        alt={movie.title}
                    />
                ))}
            </div>

            {/* {container -> posters } */}
        </div>
    );
}

export default Row;
