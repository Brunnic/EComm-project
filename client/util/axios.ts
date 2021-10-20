import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
    xsrfHeaderName: "X-XSRF-TOKEN",
});

export default instance;
