import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { Actor } from '../models/actor.ts';
import { db } from "../db.ts";
import { ActorDBO } from "../dbos/actors.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

export class ActorRepository {

    private collection = db.collection<ActorDBO>('actors');

    async getAllActors(): Promise<Actor[]> {
        const data = await this.collection.find().toArray();
        const actors = data.map(actor => ActorDBO.toModel(actor));
        return actors;
    }

    async getActorById(id: string): Promise<Actor> {
        if (!ObjectId.isValid(id)) throw createHttpError(400, 'Invalid actor ID');
        const data = await this.collection.findOne({ _id: new ObjectId(id) });
        if (!data) throw createHttpError(404, 'Actor not found');
        return ActorDBO.toModel(data);
    }

    async addActor(actor: Actor): Promise<Actor> {
        const data = await this.collection.insertOne(ActorDBO.fromModel(actor));
        const insertedId = data.insertedId;
        if (!insertedId) throw createHttpError(500, 'Failed to insert actor');
        actor.id = insertedId.toHexString();
        return actor;
    }

    async updateActor(id: string, actor: Actor): Promise<Actor> {
        if (!ObjectId.isValid(id)) throw createHttpError(400, 'Invalid actor ID');
        const data = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: ActorDBO.fromModel(actor) });
        if (!data) throw createHttpError(404, 'Actor not found');
        return actor;
    }

    async deleteActor(id: string): Promise<void> {
        if (!ObjectId.isValid(id)) throw createHttpError(400, 'Invalid actor ID');
        const data = await this.collection.deleteOne({ _id: new ObjectId(id) });
        if (!data) throw createHttpError(404, 'Actor not found');
    }
}