// deno-lint-ignore-file no-explicit-any
import { MovieService } from "../services/movies.ts";
import { validateCreateMovieDTO, validateUpdateMovieDTO } from "../dtos/movies.ts";

export class MoviesController {
    private readonly movieService: MovieService = new MovieService();

    getMovies = async ({ response }: { response: any }) => {
        response.body = await this.movieService.getMovies();
        response.status = 200;
    }

    getMovieById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const movie = await this.movieService.getMovieById(params.id);
        response.body = movie;
        response.status = 200;
    }

    addMovie = async ({ request, response }: { request: any, response: any }) => {
        const movieDto = validateCreateMovieDTO(await request.body.json());
        const movie = this.movieService.addMovie(movieDto);
        response.body = movie;
        response.status = 201;
    }

    updateMovie = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const moviesDto = validateUpdateMovieDTO(await request.body.json());
        const movie = await this.movieService.updateMovie(params.id, moviesDto);
        response.body = movie;
    }

    deleteMovie = async ({ params, response }: { params: { id: string }, response: any }) => {
        await this.movieService.deleteMovie(params.id);
        response.status = 204;
    }
}