import { Router } from "jsr:@oak/oak/router";

import { MoviesController } from "../controllers/movies.ts";

export const moviesRouter = new Router();
const controller = new MoviesController();

moviesRouter
    .get("/", controller.getMovies)
    .get("/:id", controller.getMovieById)
    .post("/", controller.addMovie)
    .put("/:id", controller.updateMovie)
    .delete("/:id", controller.deleteMovie);