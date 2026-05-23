import axios from "axios";

const api = axios.create({
    baseURL: "https://datastraw-ticket-system.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
