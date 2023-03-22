import http from './httpService';
import urls from  '../config/urls.json';

export function getGenres() {
    return http.get(urls.genresEndpoint);
}