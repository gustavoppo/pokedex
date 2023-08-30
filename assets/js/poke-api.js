const pokeApi = {};

function convertPokeApiDetailsToPokemon(pokeApiDetails) {
    const pokemon = new Pokemon()
    pokemon.id = pokeApiDetails.order
    pokemon.name = pokeApiDetails.name
    pokemon.img = pokeApiDetails.sprites.front_default

    const pokemonTypes = pokeApiDetails.types.map((typeSlot) => typeSlot.type.name)
    const[type] = pokemonTypes

    pokemon.types = pokemonTypes
    pokemon.type = pokemonTypes

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json()).then(convertPokeApiDetailsToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => pokemon.results)
    .then((pokemons) => Promise.all(pokemons.map(pokeApi.getPokemonDetail)));
};