import axios from "axios";
import config from '../config';

const pexelsInstance = axios.create({
    baseURL: "https://api.pexels.com/v1/",
    timeout: 5000,
    headers: {"Authorization":config.PEXELS_KEY}
});

export { pexelsInstance }