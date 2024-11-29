import { Collection, ObjectId } from "mongodb";
import { Flights, FlightsModel } from "./types.ts";
import { formModelToFlights } from "./utils.ts";
export const resolvers = {
  Query: {
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: {
        FlightsCollection: Collection<FlightsModel>;
      }
    ): Promise<Flights | null> => {
      const FlightsModel = await context.FlightsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!FlightsModel) {
        return null;
      }
      return formModelToFlights(FlightsModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origin: string; destiny: string; date: string },
      context: {
        FlightsCollection: Collection<FlightsModel>;
      }
    ): Promise<Flights> => {
      const { origin, destiny, date } = args;
      const { insertedId } = await context.FlightsCollection.insertOne({
        origin,
        destiny,
        date,
      });
      const FlightsModel = {
        _id: insertedId,
        origin,
        destiny,
        date,
      };
      return formModelToFlights(FlightsModel);
    },
  },
};
