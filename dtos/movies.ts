import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

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

export interface MovieDTO{
    id: string;
    title: string;
    releaseYear: number;
    summary: string;
    actors: {
        id: number;
        firstName: string;
        lastName: string;
    }[];
}

export function validateCreateMovieDTO(data: any): CreateMovieDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { title, releaseYear, summary, actors } = data;

    // Vérification du titre
    if (typeof title !== "string" || title.trim().length === 0 || title.length > 255) {
        throw createHttpError(400, "Le titre doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    // Vérification de l'année de sortie
    const currentYear = new Date().getFullYear();
    if (typeof releaseYear !== "number" || !Number.isInteger(releaseYear) || releaseYear < 1900 || releaseYear > currentYear) {
        throw createHttpError(400, `L'année de sortie doit être un entier entre 1900 et ${currentYear}.`);
    }

    // Vérification du résumé
    if (typeof summary !== "string" || summary.trim().length < 10) {
        throw createHttpError(400, "Le résumé doit contenir au moins 10 caractères.");
    }

    // Vérification de la liste des acteurs
    if (!Array.isArray(actors) || !actors.every(id => typeof id === "number" && Number.isInteger(id) && id > 0)) {
        throw createHttpError(400, "La liste des acteurs doit contenir seulement des nombres entier positif.");
    }

    return data;
}

export function validateUpdateMovieDTO(data: any): UpdateMovieDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { title, releaseYear, summary, actors } = data;

    if (title !== undefined && (typeof title !== "string" || title.trim().length === 0 || title.length > 255)) {
        throw createHttpError(400, "Le titre doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    const currentYear = new Date().getFullYear();
    if (releaseYear !== undefined && (typeof releaseYear !== "number" || !Number.isInteger(releaseYear) || releaseYear < 1900 || releaseYear > currentYear)) {
        throw createHttpError(400, `L'année de sortie doit être un entier entre 1900 et ${currentYear}.`);
    }

    if (summary !== undefined && (typeof summary !== "string" || summary.trim().length < 10)) {
        throw createHttpError(400, "Le résumé doit contenir au moins 10 caractères.");
    }

    if (actors !== undefined && (!Array.isArray(actors) || !actors.every(id => typeof id === "number" && Number.isInteger(id) && id > 0))) {
        throw createHttpError(400, "La liste des acteurs doit contenir au moins un nombre entier positif.");
    }

    return data;
}