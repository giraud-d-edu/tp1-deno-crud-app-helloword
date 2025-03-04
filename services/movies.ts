import { Movie } from '../models/movie.ts';
import { CreateMovieDTO, MovieDTO, UpdateMovieDTO } from '../dtos/movies.ts';
import { MovieRepository } from "../repositories/movies.ts";
import { ActorService } from "./actor.ts";

export class MovieService {
    static readonly movieRepository: MovieRepository = new MovieRepository();

    private modelToDTO(movies: Movie): MovieDTO {
        const movieDto: MovieDTO = {
            id: movies.id,
            title: movies.title,
            releaseYear: movies.releaseYear,
            summary: movies.summary,
            actors: []
        };
        movies.actors.forEach(actorId => {
            const actor = ActorService.actorRepository.getActorById(actorId);
            movieDto.actors.push({
                id: actor.id,
                firstName: actor.firstName,
                lastName: actor.lastName,
            });
        });
        return movieDto;
    }

    getMovies(): MovieDTO[] {
        const movies = MovieService.movieRepository.getMovies();
        return movies.map(movie => this.modelToDTO(movie));
    }

    getMovieById(id: number): MovieDTO {
        const movie = MovieService.movieRepository.getMovieById(id);
        return this.modelToDTO(movie);
    }

    addMovie(movieTdo: CreateMovieDTO): MovieDTO {
        let movie: Movie = {
            id: 0,
            title: movieTdo.title,
            releaseYear: movieTdo.releaseYear,
            summary: movieTdo.summary,
            actors: movieTdo.actors
        };
        movie = MovieService.movieRepository.addMovie(movie);
        return this.modelToDTO(movie);
    }

    updateMovie(id: number, movieDtoUpdate: UpdateMovieDTO): MovieDTO {
        let movie = MovieService.movieRepository.getMovieById(id);
        movie.title = movieDtoUpdate.title || movie.title;
        movie.releaseYear = movieDtoUpdate.releaseYear || movie.releaseYear;
        movie.summary = movieDtoUpdate.summary || movie.summary;
        movie.actors = movieDtoUpdate.actors || movie.actors;

        movie = MovieService.movieRepository.updateMovie(id, movie);
        return this.modelToDTO(movie);
    }

    deleteMovie(id: number): void {
        MovieService.movieRepository.deleteMovie(id);
    }
}