import { Context, isHttpError } from "https://deno.land/x/oak/mod.ts";

/**
 * Middleware pour gérer les exceptions
 */
export async function errorMiddleware(ctx: Context, next: () => Promise<unknown>) {
  try {
    await next(); // Exécute le middleware suivant
  } catch (err: any) {
    console.error("Erreur interceptée:", err);

    ctx.response.status = isHttpError(err) ? err.status : 500;
    ctx.response.body = {
      success: false,
      message: err.message || "Erreur interne du serveur",
      status: ctx.response.status,
    };
  }
}