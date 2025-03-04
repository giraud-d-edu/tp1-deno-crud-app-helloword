import { ActorService } from "../services/actor.ts";
import { addActorDTO, updateActorDTO } from "../dtos/actors.ts";
import { Actor } from "../models/actor.ts";
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

export class Actors {
    private readonly actorService: ActorService = new ActorService();

    getActors = ({ response }: { response: any }) => {
        response.body = this.actorService.getAllActors();
        response.status = 200;
    }

    getActorById = ({ params, response }: { params: { id: string }, response: any }) => {
        const actor = this.actorService.getActorById(parseInt(params.id));
        response.body = actor;
        response.status = 200;
    }

    addActor = async ({ request, response }: { request: any, response: any }) => {
        const actorDTO = await request.body.json() as addActorDTO;
        if (!actorDTO.firstName || !actorDTO.lastName) {
            throw createHttpError(400, "First name and last name are required.");
        }
        const actor = this.actorService.addActor(actorDTO);
        response.body = actor;
        response.status = 201;
    }

    updateActor = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        if (this.actorService.getActorById(parseInt(params.id))) {
            const actorDTO = await request.body.json() as updateActorDTO;
            if (!actorDTO.firstName && !actorDTO.lastName && !actorDTO.movies) {
                throw createHttpError(400, "You must at least modify the last name, the first name or the movies to update.");
            }
            const actor = this.actorService.updateActor(parseInt(params.id), actorDTO);
            response.body = actor;
        }
    }

    deleteActor = ({ params, response }: { params: { id: string }, response: any }) => {
        const actor = this.actorService.getActorById(parseInt(params.id));
        if (actor) {
            this.actorService.deleteActor(parseInt(params.id));
            response.status = 204;
        } else {
            response.status = 404;
            response.body = { message: 'Actor not found' };
        }
    }
}