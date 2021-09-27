import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
      <PokemonList />
    </div>
  );
}

function PokemonList() {
  const POKEMON_LIST = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        nextOffset
        prevOffset
        status
        message
        results {
          url
          name
          image
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(POKEMON_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return data.pokemons.results.map((pokemon, index) => (
    <div key={index}>
      <p>{pokemon.name}</p>
    </div>
  ));
}

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
