import { Actor } from "../models/actor.ts";

export function getAllActorsService(): Actor[] {
    return getAllActors();
}

export function getActorByIdService(id: number): Actor {
    return getActorById(id);
}

export function createActorService(Actor: Actor) {
    return createActor(Actor);
}

export function updateActorService(id: number, Actor: Actor) {
    return updateActor(id, Actor);
}

export function deleteActorService(id: number) {
    return deleteActor(id);
}