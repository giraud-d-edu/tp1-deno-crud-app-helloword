// deno-lint-ignore-file no-explicit-any
import { MovieService } from "../services/movies.ts";
import { validateCreateMovieDTO, validateUpdateMovieDTO } from "../dtos/movies.ts";

export class MoviesController {
    private readonly movieService: MovieService = new MovieService();

    getMovies = ({ response }: { response: any }) => {
        response.body = this.movieService.getMovies();
        response.status = 200;
    }

    getMovieById = ({ params, response }: { params: { id: string }, response: any }) => {
        const movie = this.movieService.getMovieById(parseInt(params.id));
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
        if (this.movieService.getMovieById(parseInt(params.id))){
            const moviesDto = validateUpdateMovieDTO(await request.body.json());
            const movie = this.movieService.updateMovie(parseInt(params.id), moviesDto);
            response.body = movie;
        }
    }

    deleteMovie = ({ params, response }: { params: { id: string }, response: any }) => {
        this.movieService.deleteMovie(parseInt(params.id));
        response.status = 204;
    }
}