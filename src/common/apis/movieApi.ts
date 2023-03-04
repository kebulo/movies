import axios from "axios";
let url: string = "https://verbena-verbena-sunspot.glitch.me/";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = window.location.href;
}

export default axios.create({
    baseURL: url+"movies"
});