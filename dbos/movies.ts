import { ObjectId } from "npm:mongodb@5.6.0";
import { Movie } from "../models/movie.ts";

export class MovieDBO {
    _id: ObjectId|null;
    title: string;
    releaseYear: number;
    summary: string;
    actors: ObjectId[];

    constructor(_id: ObjectId|null, title: string, releaseYear: number, summary: string, actors: ObjectId[]) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.summary = summary;
        this.actors = actors;
        this._id = _id;
    }

    static fromModel(model: Movie): MovieDBO {
        return new MovieDBO(
            model.id? new ObjectId(model.id) : null,
            model.title,
            model.releaseYear,
            model.summary,
            model.actors.map(actorId => new ObjectId(actorId))
        );
    }

    static toModel(dbo: MovieDBO): Movie {
        return {
            id: dbo._id? dbo._id.toHexString() : '',
            title: dbo.title,
            releaseYear: dbo.releaseYear,
            summary: dbo.summary,
            actors: dbo.actors.map(actorId => actorId.toHexString())
        };
    }
}