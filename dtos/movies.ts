export interface CreateMovieDTO {
    title: string;
    releaseYear: number;
    summary: string;
    actors: number[]; // Liste des IDs d'acteurs
  }
  
  export interface UpdateMovieDTO {
    title?: string;
    releaseYear?: number;
    summary?: string;
    actors?: number[];
  }
  
  export interface MovieDTO extends CreateMovieDTO {
    id: number;
  }