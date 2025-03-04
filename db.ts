import { MongoClient } from "npm:mongodb@5.6.0";
import "https://deno.land/std@0.208.0/dotenv/load.ts";

const MONGODB_URI = Deno.env.get("MONGODB_URI") || "";
const DB_NAME = Deno.env.get("DB_NAME") || "helloword-db";

if (!MONGODB_URI) {
  throw new Error("Please provide a MongoDB URI");
}

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB");
} catch (error) {
  throw new Error("Could not connect to MongoDB");
}

export const db = client.db(DB_NAME);