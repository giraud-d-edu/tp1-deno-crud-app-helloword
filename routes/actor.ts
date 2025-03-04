import { Router } from "jsr:@oak/oak/router";
import { ActorController } from "../controllers/actors.ts";

export const actorRouter = new Router();
const controller = new ActorController();

actorRouter
    .get("/", controller.getActors)
    .get("/:id", controller.getActorById)
    .post("/", controller.addActor)
    .put("/:id", controller.updateActor)
    .delete("/:id", controller.deleteActor);