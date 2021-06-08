import {configure} from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios'


export const config = () => {
    const api = Axios.create({
        baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/v1`
    });
    
    const cache = new LRU({max: 10});
    
    configure({axios: api, cache});
}