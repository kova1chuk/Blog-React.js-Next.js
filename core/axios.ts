import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = "https://simple-blog-api.crew.red";

export default axios;
