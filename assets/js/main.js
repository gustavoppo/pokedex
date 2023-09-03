const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById("loadMore");
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
  <li onclick="openDetails(${pokemon.id})" class="pokemon border ${pokemon.type}">
    <div class="title-card">
      <span class="pokemon-name">${pokemon.name}</span>
      <span class="pokemon-id">#${pokemon.id}</span>
    </div>

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
    <span class="background-pokemon">
  </li>`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMore.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMore.parentElement.removeChild(loadMore);
  } else {
    loadPokemonItens(offset, limit);
  }
});

