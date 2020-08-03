import axios from 'axios'

export default axios.create({
    baseURL: process.env.REACT_APP_SENSCHEMA_API_BASE_URL
});