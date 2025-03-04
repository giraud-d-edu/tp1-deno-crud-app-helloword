import { MovieService } from "../services/movies.ts";
import { ActorDTO, validateAddActorDTO, validateUpdateActorDTO } from "../dtos/actors.ts";
import { ActorService } from "../services/actor.ts";
import { Actor } from "../models/actor.ts";

export class ActorController {
    private readonly actorService: ActorService = new ActorService();

    private async modelToDTO(actor: Actor): Promise<ActorDTO> {
        const actorDTO: ActorDTO = {
            id: actor.id,
            firstName: actor.firstName,
            lastName: actor.lastName,
            movies: []
        };
        for (const movieId of actor.movies) {
            const movie = await MovieService.movieRepository.getMovieById(movieId);
            actorDTO.movies.push({
                id: movie.id,
                title: movie.title,
                releaseYear: movie.releaseYear,
                summary: movie.summary
            });
        }
        return actorDTO;
    }

    getActors = async ({ response }: { response: any }) => {
        const actors = await this.actorService.getActors();
        await actors.map(async actor => await this.modelToDTO(actor));
        response.body = actors;
        response.status = 200;
    }

    getActorById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const actor = await this.actorService.getActorById(params.id);
        response.body = await this.modelToDTO(actor);
        response.status = 200;
    }

    addActor = async ({ request, response }: { request: any, response: any }) => {
        const actorDTO = validateAddActorDTO(await request.body.json());
        let actor: Actor = {
            id: '',
            firstName: actorDTO.firstName,
            lastName: actorDTO.lastName,
            movies: actorDTO.movies
        };

        actor = await this.actorService.addActor(actor);
        response.body = await this.modelToDTO(actor);
        response.status = 201;
    }

    updateActor = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const actorsDTO = validateUpdateActorDTO(await request.body.json());

        let actor = await this.actorService.getActorById(params.id);

        actor.firstName = actorsDTO.firstName || actor.firstName;
        actor.lastName = actorsDTO.lastName || actor.lastName;
        actor.movies = actorsDTO.movies || actor.movies;
        actor = await this.actorService.updateActor(params.id, actor);
        response.body = await this.modelToDTO(actor);
        response.status = 200;
    }

    deleteActor = async ({ params, response }: { params: { id: string }, response: any }) => {
        await this.actorService.deleteActor(params.id);
        response.status = 204;
    }
}