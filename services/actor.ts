import { Actor } from "../models/actor.ts";
import { ActorRepository } from "../repositories/actors.ts";

export class ActorService {
    static readonly actorRepository: ActorRepository = new ActorRepository();

    async getActors(): Promise<Actor[]> {
        return await ActorService.actorRepository.getAllActors();
    }

    async getActorById(id: string): Promise<Actor> {
        return await ActorService.actorRepository.getActorById(id);
    }

    async addActor(actor: Actor): Promise<Actor> {
        return await ActorService.actorRepository.addActor(actor);
    }

    async updateActor(id: string, actor: Actor): Promise<Actor> {
        return await ActorService.actorRepository.updateActor(id, actor);
    }

    async deleteActor(id: string): Promise<void> {
        await ActorService.actorRepository.deleteActor(id);
    }
}