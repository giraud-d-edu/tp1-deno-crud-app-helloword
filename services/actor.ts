import { Actor } from "../models/actor.ts";
import { ActorRepository } from "../repositories/actors.ts";
import {ActorDTO, addActorDTO, updateActorDTO} from "../dtos/actors.ts";

export class ActorService {
    static readonly actorRepository: ActorRepository = new ActorRepository();

    getAllActors(): ActorDTO[] {
        return ActorService.actorRepository.getAllActors() as ActorDTO[];
    }

    getActorById(id: number): ActorDTO {
        return ActorService.actorRepository.getActorById(id) as ActorDTO;
    }

    addActor(actorDTO: addActorDTO) {
//        if (actor.firstName === null || actor.lastName === null) {
//            throw new Error("First name or last name are required.");
//        }
        let actor: Actor = {
            id: 0,
            firstName: actorDTO.firstName,
            lastName: actorDTO.lastName,
            movies: actorDTO.movies,
        };
        actor = ActorService.actorRepository.addActor(actor);
        return actor as ActorDTO;
    }

    updateActor(id: number, actorDTO: updateActorDTO): ActorDTO {
//        if (typeof actor.id !== "number" || actor.id <= 0) {
//            throw new Error("Actor ID must be a positive number.");
//        }
        let actor = ActorService.actorRepository.getActorById(id);
        actorDTO.firstName = actorDTO.firstName || actor.firstName;
        actorDTO.lastName = actorDTO.lastName || actor.lastName;
        actorDTO.movies = actorDTO.movies || actor.movies;

        actor = ActorService.actorRepository.updateActor(id, actor);

        return actor as ActorDTO;
    }

    deleteActor(id: number): void {
        ActorService.actorRepository.deleteActor(id);
    }
}