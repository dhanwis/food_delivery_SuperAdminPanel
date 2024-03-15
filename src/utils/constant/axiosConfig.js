import axios from "axios";
import { baseURL } from "./urls";

const instance = axios.create({ baseURL: baseURL });

export default instance;
