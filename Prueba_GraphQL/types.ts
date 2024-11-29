import { type OptionalId } from "mongodb";

export type Flights = {
  id: string;
  origin: string;
  destiny: string;
  date: string;
};

export type FlightsModel = OptionalId<{
  origin: string;
  destiny: string;
  date: string;
}>;
