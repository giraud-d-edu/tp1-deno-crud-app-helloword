export interface addActorDTO {
    id: number;
    firstName: string;
    lastName: string;
    movies: number[]; // Movie IDs
}

export interface updateActorDTO {
    id?: number;
    firstName?: string;
    lastName?: string;
    movies?: number[]; // Movie IDs
}

export interface ActorDTO extends addActorDTO {
    id: number;
}
