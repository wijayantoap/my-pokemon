import POKEMON_LIST from "../statics/pokemon-list";

const pokeMock = {
  request: {
    query: POKEMON_LIST,
  },
  result: {
    data: {
      pokemons: {
        count: 1118,
        next: "https://pokeapi.co/api/v2/pokemon/?offset=21&limit=20",
        previous: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1",
        nextOffset: 21,
        prevOffset: 0,
        status: true,
        message: "",
        results: [
          {
            url: "https://pokeapi.co/api/v2/pokemon/2/",
            name: "ivysaur",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/3/",
            name: "venusaur",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/4/",
            name: "charmander",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/5/",
            name: "charmeleon",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/6/",
            name: "charizard",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/7/",
            name: "squirtle",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/8/",
            name: "wartortle",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/9/",
            name: "blastoise",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/10/",
            name: "caterpie",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/11/",
            name: "metapod",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/12/",
            name: "butterfree",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/13/",
            name: "weedle",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/14/",
            name: "kakuna",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/15/",
            name: "beedrill",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/16/",
            name: "pidgey",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/17/",
            name: "pidgeotto",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/18/",
            name: "pidgeot",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/19/",
            name: "rattata",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/20/",
            name: "raticate",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
            __typename: "PokemonItem",
          },
          {
            url: "https://pokeapi.co/api/v2/pokemon/21/",
            name: "spearow",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
            __typename: "PokemonItem",
          },
        ],
        __typename: "PokemonList",
      },
    },
  },
};

export default pokeMock;
