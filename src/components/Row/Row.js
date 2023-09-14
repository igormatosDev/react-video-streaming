import React, { useState, useEffect } from "react";
import axios from "../../settings/axios";
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


const base_url = "https://image.tmdb.org/t/p/original";
const vid_opts = {
    height: "680",
    width: "100%",
    playerVars: {
        autoplay: 1,
    }
}


function Row({ title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerID, setTrailerID] = useState("");
    const [lastClickedMovie, setLastClickedMovie] = useState(0);
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
    }, []);


    const handleClick = (movie) =>{
        if(trailerID && lastClickedMovie == movie.id){
            setTrailerID('');
        }else{
            setLastClickedMovie(movie.id);
            movieTrailer( movie?.name || "")
            .then(url => {
                setTrailerID('');
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerID(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
    }


    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        onClick={() => {handleClick(movie)}}
                        key={movie.id}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        src={base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)}
                        alt={movie.title}
                    />
                ))}
            </div>

            {trailerID && <YouTube videoId={trailerID} opts={vid_opts}/>}
        </div>
    );
}

export default Row;
