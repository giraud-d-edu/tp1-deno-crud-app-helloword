import { Actor } from '../models/actor.ts';

const actors: Actor[] = [
    { id: 1, lastName: "Radcliffe", firstName: "Daniel" },
    { id: 2, lastName: "Reeves", firstName: "Keanu" }
];

export class ActorRepository {
    getAllActors(): Actor[] {
        if (actors.length === 0) {
            throw new Error("No actors found");
        } else {
            return actors;
        }
    }

    getActorById(id: number): Actor | undefined {
        return actors.find(actor => actor.id === id);
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
        actors[index] = actor;
        return actor;
    }

    deleteActor(id: number) {
        const index = actors.findIndex(actor => actor.id === id);
        actors.splice(index, 1);
    }
}