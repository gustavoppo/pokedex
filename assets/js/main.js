const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;


function convertPokemonToLi(pokemon) {
  return ` <li class="pokemon">
  <span class="pokemon-id">#${pokemon.id}</span>
  <span class="pokemon-name">${pokemon.name}</span>

  <div class="pokemon-datails">
    <ol class="pokemon-types">
      ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join("")}
    </ol>
    <img
      class="img-pokemon"
      src="assets/img/${pokemon.name}.png"
      alt="${pokemon.name}"
    />
  </div>
</li>`;
}

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
  // listItens.join("");
});
