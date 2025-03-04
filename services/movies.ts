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

    async getMovies(): Promise<MovieDTO[]> {
        const movies = await MovieService.movieRepository.getMovies();
        return movies.map(movie => this.modelToDTO(movie));
    }

    async getMovieById(id: string): Promise<MovieDTO> {
        const movie = await MovieService.movieRepository.getMovieById(id);
        return this.modelToDTO(movie);
    }

    async addMovie(movieTdo: CreateMovieDTO): Promise<MovieDTO> {
        let movie: Movie = {
            id: '',
            title: movieTdo.title,
            releaseYear: movieTdo.releaseYear,
            summary: movieTdo.summary,
            actors: movieTdo.actors
        };
        movie = await MovieService.movieRepository.addMovie(movie);
        return this.modelToDTO(movie);
    }

    async updateMovie(id: string, movieDtoUpdate: UpdateMovieDTO): Promise<MovieDTO> {
        let movie = await MovieService.movieRepository.getMovieById(id);
        movie.title = movieDtoUpdate.title || movie.title;
        movie.releaseYear = movieDtoUpdate.releaseYear || movie.releaseYear;
        movie.summary = movieDtoUpdate.summary || movie.summary;
        movie.actors = movieDtoUpdate.actors || movie.actors;

        movie = await MovieService.movieRepository.updateMovie(id, movie);
        return this.modelToDTO(movie);
    }

    async deleteMovie(id: string): Promise<void> {
        MovieService.movieRepository.deleteMovie(id);
    }
}