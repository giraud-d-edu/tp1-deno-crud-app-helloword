// deno-lint-ignore-file no-explicit-any
import { MovieService } from "../services/movies.ts";
import { MovieDTO, validateCreateMovieDTO, validateUpdateMovieDTO } from "../dtos/movies.ts";
import { ActorService } from "../services/actor.ts";
import { Movie } from "../models/movie.ts";

export class MoviesController {
    private readonly movieService: MovieService = new MovieService();

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

    getMovies = async ({ response }: { response: any }) => {
        const movies = await this.movieService.getMovies();
        movies.map(movie => this.modelToDTO(movie));
        response.body = movies;
        response.status = 200;
    }

    getMovieById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const movie = await this.movieService.getMovieById(params.id);
        response.body = this.modelToDTO(movie);
        response.status = 200;
    }

    addMovie = async ({ request, response }: { request: any, response: any }) => {
        const movieDto = validateCreateMovieDTO(await request.body.json());
        let movie: Movie = {
            id: '',
            title: movieDto.title,
            releaseYear: movieDto.releaseYear,
            summary: movieDto.summary,
            actors: movieDto.actors
        };
        movie = await this.movieService.addMovie(movie);
        response.body = this.modelToDTO(movie);
        response.status = 201;
    }

    updateMovie = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const moviesDto = validateUpdateMovieDTO(await request.body.json());

        let movie = await this.movieService.getMovieById(params.id);
        movie.title = moviesDto.title || movie.title;
        movie.releaseYear = moviesDto.releaseYear || movie.releaseYear;
        movie.summary = moviesDto.summary || movie.summary;
        movie.actors = moviesDto.actors || movie.actors;

        movie = await this.movieService.updateMovie(params.id, movie);

        response.body = this.modelToDTO(movie);
        response.status = 200;
    }

    deleteMovie = async ({ params, response }: { params: { id: string }, response: any }) => {
        await this.movieService.deleteMovie(params.id);
        response.status = 204;
    }
}