// deno-lint-ignore-file no-explicit-any
import { MovieService } from "../services/movies.ts";
import { CreateMovieDTO, UpdateMovieDTO } from "../dtos/movies.ts";
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

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
        const movieTdo = await request.body.json() as CreateMovieDTO;
        const movie = this.movieService.addMovie(movieTdo);
        response.body = movie;
        response.status = 201;
    }

    updateMovie = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        if (this.movieService.getMovieById(parseInt(params.id))){
            const moviesTdo = await request.body.json() as UpdateMovieDTO;
            const movie = this.movieService.updateMovie(parseInt(params.id), moviesTdo);
            response.body = movie;
        }
    }

    deleteMovie = ({ params, response }: { params: { id: string }, response: any }) => {
        const movie = this.movieService.getMovieById(parseInt(params.id));
        if (movie) {
            this.movieService.deleteMovie(parseInt(params.id));
            response.status = 204;
        } else {
            response.status = 404;
            response.body = { message: 'Movie not found' };
        }
    }
}