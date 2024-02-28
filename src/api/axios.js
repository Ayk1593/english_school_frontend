import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api.englishbyjulia.com/",
  baseURL: "https://english-school-back.vercel.app",
  // baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
  // withCredentials: true,

});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

export default instance;
