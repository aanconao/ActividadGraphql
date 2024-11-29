export const schema = `#graphql
type Flights {
  id: ID!
  origin: String!
  destiny: String!
  date: String!
}

type Query {
    getFlight(id: ID!): Flights
    getFlights(origin: String , destiny:String): [Flights!]!
}

type Mutation {
  addFlight(origin: String!, destiny: String!, date: String!): Flights!
}
`;
