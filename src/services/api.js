import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bibleapi.co/api/',
})

export default api;