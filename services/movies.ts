import { Movie } from '../models/movie.ts';
import { CreateMovieDTO, MovieDTO, UpdateMovieDTO } from '../dtos/movies.ts';
import { MovieRepository } from "../repositories/movies.ts";

export class MovieService {
    private readonly movieRepository: MovieRepository = new MovieRepository();

    getMovies(): MovieDTO[] {
        return this.movieRepository.getMovies() as MovieDTO[];
    }

    getMovieById(id: number): MovieDTO {
        return this.movieRepository.getMovieById(id) as MovieDTO;
    }

    addMovie(movieTdo: CreateMovieDTO): MovieDTO {
        let movie: Movie = {
            id: 0,
            title: movieTdo.title,
            releaseYear: movieTdo.releaseYear,
            summary: movieTdo.summary,
            actors: movieTdo.actors
        };
        movie = this.movieRepository.addMovie(movie);
        return movie as MovieDTO;
    }

    updateMovie(id: number, movieTdo: UpdateMovieDTO): MovieDTO {
        let movie = this.movieRepository.getMovieById(id);
        movieTdo.title = movieTdo.title || movie.title;
        movieTdo.releaseYear = movieTdo.releaseYear || movie.releaseYear;
        movieTdo.summary = movieTdo.summary || movie.summary;
        movieTdo.actors = movieTdo.actors || movie.actors;

        movie = this.movieRepository.updateMovie(id, movie);

        return movie as MovieDTO;
    }

    deleteMovie(id: number): void {
        this.movieRepository.deleteMovie(id);
    }
}