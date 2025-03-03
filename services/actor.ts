import { Actor } from "../models/actor.ts";

export function getAllActorsService(): Actor[] {
    return getAllActors();
}

export function getActorByIdService(id: number): Actor {
    return getActorById(id);
}

export function createActorService(actor: Actor) {
    if (actor.firstName === null || actor.lastName === null) {
        throw new Error("First name or last name are required.");
    }
    return createActor(actor);
}

export function updateActorService(id: number, actor: Actor) {
    if (typeof id !== "number" || id <= 0) {
        throw new Error("Actor ID must be a positive number.");
    }
    return updateActor(id, actor);
}

export function deleteActorService(id: number) {
    return deleteActor(id);
}