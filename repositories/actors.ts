import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { Actor } from '../models/actor.ts';

const actors: Actor[] = [
    { id: 1, lastName: "Radcliffe", firstName: "Daniel", movies: [] },
    { id: 2, lastName: "Reeves", firstName: "Keanu", movies: [] },
];

export class ActorRepository {
    getAllActors(): Actor[] {
        if (actors.length === 0) {
            throw new Error("No actors found");
        } else {
            return actors;
        }
    }

    getActorById(id: number): Actor {
        const res = actors.find(actor => actor.id === id);
        if (!res) throw createHttpError(404, 'Actor not found');
        return res;
    }

    addActor(actor: Actor) {
        actor.id = actors.length;
        actors.push(actor);
        return actor;
    }

    updateActor(id: number, actor: Actor) {
        if (id < 0 || id >= actors.length) {
            throw new Error('Invalid actor ID : ' + id);
        }
        const index = actors.findIndex(actor => actor.id === id);
        if (index === -1) throw createHttpError(404, 'Actor not found');
        actors[index] = actor;
        return actor;
    }

    deleteActor(id: number) {
        const index = actors.findIndex(actor => actor.id === id);
        if (index === -1) throw createHttpError(404, 'Actor not found');
        actors.splice(index, 1);
    }
}