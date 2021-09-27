import React from "react";
import client from "../configs/apollo-client";
import POKEMON_LIST from "../statics/pokemon-list";

function Home({ data }) {
  return data.pokemons.results.map((pokemon, index) => (
    <div key={index}>
      <p>{pokemon.name}</p>
    </div>
  ));
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: POKEMON_LIST,
  });

  return {
    props: { data },
  };
}

export default Home;
