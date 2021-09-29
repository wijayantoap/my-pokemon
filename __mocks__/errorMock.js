import POKEMON_LIST from "../statics/pokemon-list";

const errorMock = {
  request: {
    query: POKEMON_LIST,
  },
  error: new Error("An error occurred"),
};

export default errorMock;
