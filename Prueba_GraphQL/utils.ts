import { Flights, FlightsModel } from "./types.ts";

export const formModelToFlights = (FlightsModel: FlightsModel): Flights => {
  return {
    id: FlightsModel._id!.toString(),
    origin: FlightsModel.origin,
    destiny: FlightsModel.destiny,
    date: FlightsModel.date,
  };
};
