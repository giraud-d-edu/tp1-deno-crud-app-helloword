import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { Movie } from '../models/movie.ts';

const movies: Movie[] = [] as Movie[];

export class MovieRepository {

    getMovies(): Movie[] {
        return movies;
    }

    getMovieById (id: number): Movie {
        const res = movies.find(movie => movie.id === id);
        if (!res) throw createHttpError(404, 'Movie not found');
        return res;
    }

    addMovie (movie: Movie): Movie {
        movie.id = movies.length;
        movies.push(movie);
        return movie;
    }

    updateMovie (id: number, movie: Movie): Movie {
        const index = movies.findIndex(movie => movie.id === id);
        if (index === -1) throw createHttpError(404, 'Movie not found');
        movies[index] = movie;
        return movie;
    }

    deleteMovie (id: number): void {
        const index = movies.findIndex(movie => movie.id === id);
        if (index === -1) throw createHttpError(404, 'Movie not found');
        movies.splice(index, 1);
    }

}