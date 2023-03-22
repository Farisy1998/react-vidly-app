import http from './httpService';
import urls from '../config/urls.json';

export function getMovies() {
    return http.get(urls.moviesEndpoint);
}

export function deleteMovie(movieId) {
    return http.delete(urls.moviesEndpoint + "/" + movieId);
}