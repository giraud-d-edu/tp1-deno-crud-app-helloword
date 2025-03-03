import { Actor } from '../models/actor.ts';

const actors: Actor[] = [
    { id: 1, lastName: "Radcliffe", firstName: "Daniel" },
    { id: 2, lastName: "Reeves", firstName: "Keanu" }
];

export function getAllActors(): Actor[] {
    if (actors.length === 0) {
        throw new Error("No actors found");
    } else {
        return actors;
    }
}

export function getActorById(id: number): Actor {
    const actor = actors.find(actor => actor.id === id);

    if (actor) {
        return actor;
    } else {
        throw new Error("There is no actor with this id: " + id)
    }
}

export function createActor(actor: Actor) {
    const newActor = { id: actors.length+1, lastName: actor.lastName, firstName: actor.firstName };
    return actors.push(newActor);
}

export function updateActor(id: number, actor:Actor) {
    const index = actors.findIndex(actor => actor.id === id);

    if (index !== -1) {
        actors[index] = {...actor, id: id};
    } else {
        throw new Error("No actors can be updated with this id " + id);
    }
}

export function deleteActor(id: number) {
    const index = actors.findIndex(actor => actor.id === id);

    if (index !== -1) {
        actors.splice(index)
    } else {
        throw new Error("No actors can be updated with this id " + id);
    }
}