const pokeApi = {};

function convertPokeApiDetailsToPokemon(pokeApiDetails) {
  const pokemon = new Pokemon();
  const pokemonTypes = pokeApiDetails.types.map(
    (typeSlot) => typeSlot.type.name
  );
  const [type] = pokemonTypes;

  pokemon.id = pokeApiDetails.id;
  pokemon.name = pokeApiDetails.name;
  pokemon.img = pokeApiDetails.sprites.front_default;

  pokemon.types = pokemonTypes;
  pokemon.type = type;

  pokemon.abilities = pokeApiDetails.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );
  pokemon.ability = pokemon.abilities;

  pokemon.height = pokeApiDetails.height;
  pokemon.weight = pokeApiDetails.weight;

  pokemon.statsInfo = pokeApiDetails.stats.map((statSlot) => statSlot.base_stat);
  pokemon.stats = pokeApiDetails.stats.map((statSlot) => statSlot.stat.name);
  pokemon.stat = pokemon.stats;

  return pokemon;
}

function getPokemonDetail(pokemon) {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon);
}

pokeApi.getPokemonDetail = getPokemonDetail;

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonUnique = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon);
};
