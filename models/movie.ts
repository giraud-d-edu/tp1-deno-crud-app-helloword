export interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    summary: string;
    actors: number[]; // Actor IDs
}