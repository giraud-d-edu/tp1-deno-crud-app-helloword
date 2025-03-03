import { Actor } from './actor.ts';

export interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    summary: string;
    actors: Actor[];
}