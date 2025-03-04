export interface Movie {
    id: string;
    title: string;
    releaseYear: number;
    summary: string;
    actors: number[]; // Actor IDs
}