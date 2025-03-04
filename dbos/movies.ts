import { ObjectId } from "npm:mongodb@5.6.0";
import { Movie } from "../models/movie.ts";

export class MovieDBO {
    _id: ObjectId;
    title: string;
    releaseYear: number;
    summary: string;
    actors: number[];

    constructor(_id: ObjectId, title: string, releaseYear: number, summary: string, actors: number[]) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.summary = summary;
        this.actors = actors;
        this._id = _id;
    }

    static fromModel(model: Movie): MovieDBO {
        return new MovieDBO(
            new ObjectId(model.id),
            model.title,
            model.releaseYear,
            model.summary,
            model.actors
        );
    }

    static toModel(dbo: MovieDBO): Movie {
        return {
            id: dbo._id.toHexString(),
            title: dbo.title,
            releaseYear: dbo.releaseYear,
            summary: dbo.summary,
            actors: dbo.actors
        };
    }
}