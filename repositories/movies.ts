import { Movie } from '../models/movie.ts';

const movies: Movie[] = [] as Movie[];

export class MovieRepository {

    getMovies(): Movie[] {
        return movies;
    }

    getMovieById (id: number): Movie | undefined {
        return movies.find(movie => movie.id === id);
    }

    addMovie (movie: Movie): Movie {
        movie.id = movies.length;
        movies.push(movie);
        return movie;
    }

    updateMovie (id: number, movie: Movie): Movie {
        if (id < 0 || id >= movies.length) {
            throw new Error('Invalid movie ID : ' + id);
        }
        const index = movies.findIndex(movie => movie.id === id);
        movies[index] = movie;
        return movie;
    }

    deleteMovie (id: number): void {
        const index = movies.findIndex(movie => movie.id === id);
        movies.splice(index, 1);
    }

}