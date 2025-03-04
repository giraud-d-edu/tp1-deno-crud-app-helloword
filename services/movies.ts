import { Movie } from '../models/movie.ts';
import { MovieRepository } from "../repositories/movies.ts";

export class MovieService {
    static readonly movieRepository: MovieRepository = new MovieRepository();

    async getMovies(): Promise<Movie[]> {
        return await MovieService.movieRepository.getMovies();
    }

    async getMovieById(id: string): Promise<Movie> {
        return await MovieService.movieRepository.getMovieById(id);
    }

    async addMovie(movie: Movie): Promise<Movie> {
        return await MovieService.movieRepository.addMovie(movie);
    }

    async updateMovie(id: string, movie: Movie): Promise<Movie> {
        return await MovieService.movieRepository.updateMovie(id, movie);
    }

    async deleteMovie(id: string): Promise<void> {
        await MovieService.movieRepository.deleteMovie(id);
    }
}