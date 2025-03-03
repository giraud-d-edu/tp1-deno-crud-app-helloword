import { Movie } from '../models/movie.ts';
import { MovieRepository } from "../repositories/movies.ts";

export class MovieService {
    private readonly movieRepository: MovieRepository = new MovieRepository();

    getMovies(): Movie[] {
        return this.movieRepository.getMovies();
    }

    getMovieById(id: number): Movie | undefined {
        return this.movieRepository.getMovieById(id);
    }

    addMovie(movie: Movie): Movie {
        return this.movieRepository.addMovie(movie);
    }

    updateMovie(id: number, movie: Movie): Movie {
        try {
            return this.movieRepository.updateMovie(id, movie);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    deleteMovie(id: number): void {
        this.movieRepository.deleteMovie(id);
    }
}