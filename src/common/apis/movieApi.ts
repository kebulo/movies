import axios from "axios";
const url = window.location.href;

export default axios.create({
    baseURL: url+"movies"
});