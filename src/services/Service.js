import axios from 'axios';

export default axios.create({
    baseURL: "https://tis-sistema-cotizacion.herokuapp.com"
})