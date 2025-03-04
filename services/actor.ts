import { Actor } from "../models/actor.ts";
import { ActorRepository } from "../repositories/actors.ts";

export class ActorService {
    private readonly actorRepository: ActorRepository = new ActorRepository();

    getAllActors(): Actor[] {
        return this.actorRepository.getAllActors();
    }

    getActorById(id: number): Actor | undefined {
        return this.actorRepository.getActorById(id);
    }

    addActor(actor: Actor) {
        if (actor.firstName === null || actor.lastName === null) {
            throw new Error("First name or last name are required.");
        }
        return this.actorRepository.addActor(actor);
    }

    updateActor(id: number, actor: Actor): Actor {
//        if (typeof actor.id !== "number" || actor.id <= 0) {
//            throw new Error("Actor ID must be a positive number.");
//        }
          return this.actorRepository.updateActor(id, actor);
    }

    deleteActor(id: number): void {
        this.actorRepository.deleteActor(id);
    }
}