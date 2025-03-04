import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { Movie } from '../models/movie.ts';
import { db } from '../db.ts';
import { MovieDBO } from '../dbos/movies.ts';
import { ObjectId } from "npm:mongodb@5.6.0";

export class MovieRepository {

    private collection = db.collection<MovieDBO>('movies');

    async getMovies(): Promise<Movie[]> {
        const data = await this.collection.find().toArray();
        const movies = data.map(movie => MovieDBO.toModel(movie));
        return movies;
    }

    async getMovieById (id: string): Promise<Movie> {
        if (!ObjectId.isValid(id)) throw createHttpError(400, 'Invalid movie ID');
        const data = await this.collection.findOne({ _id: new ObjectId(id) });
        if (!data) throw createHttpError(404, 'Movie not found');
        return MovieDBO.toModel(data);
    }

    async addMovie (movie: Movie): Promise<Movie> {
        const data = await this.collection.insertOne(MovieDBO.fromModel(movie));
        const insertedId = data.insertedId;
        if (!insertedId) throw createHttpError(500, 'Failed to insert movie');
        movie.id = insertedId.toHexString();
        return movie;
    }

    async updateMovie (id: string, movie: Movie): Promise<Movie> {
        if (!ObjectId.isValid(id)) throw createHttpError(400, 'Invalid movie ID');
        const data = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: MovieDBO.fromModel(movie) });
        if (!data) throw createHttpError(404, 'Movie not found');
        return movie;
    }

    async deleteMovie (id: string): Promise<void> {
        if (!ObjectId.isValid(id)) throw createHttpError(400, 'Invalid movie ID');
        const data = await this.collection.deleteOne({ _id: new ObjectId(id) });
        if (!data) throw createHttpError(500, 'Failed to delete movie');
        if (data.deletedCount == 0) throw createHttpError(404, 'Movie not found');
    }

}