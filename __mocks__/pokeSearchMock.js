import POKEMON_NAME from "../statics/pokemon-name";

const pokeSearchMock = {
  request: {
    query: POKEMON_NAME,
    variables: {
      name: "ditto",
    },
  },
  result: {
    data: {
      pokemon: {
        id: 132,
        name: "ditto",
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
          __typename: "Sprite",
        },
        moves: [
          {
            move: {
              name: "transform",
              __typename: "BaseName",
            },
            __typename: "Move",
          },
        ],
        types: [
          {
            type: {
              name: "normal",
              __typename: "BaseName",
            },
            __typename: "Type",
          },
        ],
        __typename: "Pokemon",
      },
    },
  },
};

export default pokeSearchMock;
