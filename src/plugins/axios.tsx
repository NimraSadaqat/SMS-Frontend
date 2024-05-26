import axios from "axios";

// axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_DEV;

export default axios;
