import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

// if you export it as a default, you can call it everything while importing it
export default instance;