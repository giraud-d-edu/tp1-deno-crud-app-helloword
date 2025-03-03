// deno-lint-ignore-file no-explicit-any
import { MovieService } from "../services/movies.ts";
import { Movie } from "../models/movie.ts";

export class MoviesController {
    private readonly movieService: MovieService = new MovieService();

    getMovies = ({ response }: { response: any }) => {
        response.body = this.movieService.getMovies();
        response.status = 200;
    }

    getMovieById = ({ params, response }: { params: { id: string }, response: any }) => {
        const movie = this.movieService.getMovieById(parseInt(params.id));
        if (movie) {
            response.body = movie;
            response.status = 200;
        } else {
            response.status = 404;
            response.body = { message: 'Movie not found' };
        }
    }

    addMovie = async ({ request, response }: { request: any, response: any }) => {
        const body = await request.body.json();
        let movie = body as Movie;
        movie = this.movieService.addMovie(movie);
        response.body = movie;
        response.status = 201;
    }

    updateMovie = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const movie = this.movieService.getMovieById(parseInt(params.id));
        if (movie) {
            const body = await request.body.json();
            let movie = body as Movie;
            movie = this.movieService.updateMovie(parseInt(params.id), movie);
            response.body = movie;
        } else {
            response.status = 404;
            response.body = { message: 'Movie not found' };
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