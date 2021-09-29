import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
