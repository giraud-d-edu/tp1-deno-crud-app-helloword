// deno-lint-ignore-file
import { Context, isHttpError } from "https://deno.land/x/oak/mod.ts";

const logFilePath = "./log/error.log";

/**
 * Fonction pour enregistrer les erreurs dans un fichier de log
 */
async function logError(message: string) {
    const logMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    console.error(logMessage);

    try {
        await Deno.writeTextFile(logFilePath, logMessage, { append: true });
    } catch (writeError) {
        console.error("Impossible d'écrire dans le fichier de log:", writeError);
    }
}

/**
 * Middleware pour gérer les exceptions
 */
export async function errorMiddleware(
    ctx: Context<Record<string, any>>,
    next: () => Promise<unknown>
  ) {
    try {
        await next(); // Exécute le middleware suivant
    } catch (err: any) {
        const status = isHttpError(err) ? err.status : 500;
        const errorMessage = err.message || "Erreur interne du serveur";

        // Log l'erreur dans le fichier et la console
        await logError(`URL: ${ctx.request.url} - Status: ${status} - Message: ${errorMessage}`);

        ctx.response.status = status;
        ctx.response.body = {
            success: false,
            message: errorMessage,
            status,
        };
    }
}