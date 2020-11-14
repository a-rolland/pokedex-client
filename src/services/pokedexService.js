import axios from "axios";

const pokemonService = axios.create({
  baseURL: `http://localhost:5000`,
  // withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
  pokemonService,

  newPokemon: (pokemonObj) => {
    return pokemonService
      .post("/addPkmn", pokemonObj)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  getPokemons: () => {
    return pokemonService
      .get("/pokemons")
      .then((response) => response.data)
      .catch(errorHandler);
  },
};
