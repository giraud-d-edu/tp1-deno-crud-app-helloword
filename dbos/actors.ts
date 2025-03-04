import { ObjectId } from "npm:mongodb@5.6.0";
import { Actor } from "../models/actor.ts";

export class ActorDBO {
    _id: ObjectId|null;
    firstName: string;
    lastName: string;
    movies: ObjectId[];

    constructor(_id: ObjectId, firstName: string, lastName: string, movies: ObjectId[]) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.movies = movies;
    }

    static fromModel(model: Actor): ActorDBO {
        return new ActorDBO(
            new ObjectId(model.id),
            model.firstName,
            model.lastName,
            model.movies.map(movieId => new ObjectId(movieId))
        );
    }

    static toModel(dbo: ActorDBO): Actor {
        return {
            id: dbo._id? dbo._id.toHexString() : '',
            firstName: dbo.firstName,
            lastName: dbo.lastName,
            movies: dbo.movies.map(movieId => movieId.toHexString())
        };
    }
}