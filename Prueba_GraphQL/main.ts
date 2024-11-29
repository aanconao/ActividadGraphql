import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { FlightsModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const urlMongo = Deno.env.get("MONGO_URL");
if (!urlMongo) {
  console.error("Error obtener MONGO_URL");
  Deno.exit(1);
}

const client = new MongoClient(urlMongo);
await client.connect();
console.info("TODO BIEN MONGO");

const mongoDB = client.db("Flights");

const FlightsCollection = mongoDB.collection<FlightsModel>("Flights");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ FlightsCollection }),
});

console.info(`Server ready at ${url}`);
