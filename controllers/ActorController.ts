import { Actor } from "../models/actor.ts";
import { getAllActorsService, getActorByIdService, createActorService, updateActorService, deleteActorService } from "../services/actor.ts"

export function getAllActorsControllers(): Actor[] {
    return getAllActorsService();
}

export function getActorByIdControllers(id: number): Actor {
    return getActorByIdService(id);
}

export function createActorControllers(Actor: Actor) {
    return createActorService(Actor);
}

export function updateActorControllers(id: number, Actor: Actor) {
    return updateActorService(id, Actor);
}

export function deleteActorControllers(id: number) {
    return deleteActorService(id);
}