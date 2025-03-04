import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

export interface AddActorDTO {
    id: string;
    firstName: string;
    lastName: string;
    movies: string[]; // Actor IDs
}

export interface UpdateActorDTO {
    id?: string;
    firstName?: string;
    lastName?: string;
    movies?: string[]; // Actor IDs
}

export interface ActorDTO {
    id: string;
    firstName: string;
    lastName: string;
    movies: {
        id: string;
        title: string;
        releaseYear: number;
        summary: string;
    }[];
}

export function validateAddActorDTO(data: any): AddActorDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { firstName, lastName, movies } = data;

    // Vérification du prénom
    if (typeof firstName !== "string" || firstName.trim().length === 0 || firstName.length > 255) {
        throw createHttpError(400, "Le prénom doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    // Vérification du nom de famille
    if (typeof lastName !== "string" || lastName.trim().length === 0 || lastName.length > 255) {
        throw createHttpError(400, "Le nom de famille doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    // Vérification de la liste des films
    if (!Array.isArray(movies) || !movies.every(id => typeof id === "number" && Number.isInteger(id) && id > 0)) {
        throw createHttpError(400, "La liste de films doit contenir seulement des ObjectId valides.");
    }

    return data;
}

export function validateUpdateActorDTO(data: any): UpdateActorDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { firstName, lastName, movies } = data;

    if (firstName !== undefined && (typeof firstName !== "string" || firstName.trim().length === 0 || firstName.length > 255)) {
        throw createHttpError(400, "Le prénom doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    if (lastName !== undefined && (typeof lastName !== "string" || lastName.trim().length === 0 || lastName.length > 255)) {
        throw createHttpError(400, "Le nom de famille doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    if (movies !== undefined && (!Array.isArray(movies) || !movies.every(id => typeof id === "string" && id.trim().length > 0))) {
        throw createHttpError(400, "Les films doivent être un tableau de chaînes de caractères non vides.");
    }

    return data;
}