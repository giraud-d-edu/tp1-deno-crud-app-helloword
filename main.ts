import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";

import { } from "./db.ts";
import { moviesRouter } from "./routes/movies.ts";
import { actorRouter } from "./routes/actor.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.ts";

const router = new Router();
router.use("/movies", moviesRouter.routes());
router.use("/actors", actorRouter.routes());

const app = new Application<Record<string, any>>();

// middleware
app.use(errorMiddleware);

// routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });