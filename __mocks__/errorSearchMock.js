import POKEMON_NAME from "../statics/pokemon-name";

const errorSearchMock = {
  request: {
    query: POKEMON_NAME,
  },
  error: new Error("An error occurred"),
};

export default errorSearchMock;
