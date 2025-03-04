import { ActorService } from "../services/actor.ts";
import { Actor } from "../models/actor.ts";

export class ActorController {
    private readonly actorService: ActorService = new ActorService();

    getActors = ({ response }: { response: any }) => {
        response.body = this.actorService.getAllActors();
        response.status = 200;
    }

    getActorById = ({ params, response }: { params: { id: string }, response: any }) => {
        const actor = this.actorService.getActorById(parseInt(params.id));
        if (actor) {
            response.status = 200;
            response.body = actor;
        } else {
            response.status = 404;
            response.body = { message: "Actor not found" };
        }
    }

    addActor = async ({ request, response }: { request: any, response: any }) => {
        const body = await request.body.json();
        let actor = body as Actor;
        actor = this.actorService.addActor(actor);
        response.body = actor;
        response.status = 201;
    }

    updateActor = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const actor = this.actorService.getActorById(parseInt(params.id));
        if (actor) {
            const body = await request.body.json();
            let actor = body as Actor;
            actor = this.actorService.updateActor(parseInt(params.id), actor);
            response.body = actor;
        } else {
            response.status = 404;
            response.body = { message: "Actor not found" };
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