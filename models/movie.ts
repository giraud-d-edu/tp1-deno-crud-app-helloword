import {ObjectId} from "npm:mongodb@5.6.0";

export interface Movie {
    id: string;
    title: string;
    releaseYear: number;
    summary: string;
    actors: string[]; // Actor IDs
}