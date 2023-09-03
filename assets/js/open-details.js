const pokemonDetail = document.getElementById("pokemonDetail");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function convertPokeApiDetailsToPokemons(pokemon) {
  return `
  <div class="modal-content ${pokemon.type}">
    <span class="title-modal">
     <span class="pokemon-details-modal">
      <h1 class="pokemon-name-modal">${pokemon.name}</h1>
        <ol class="modal-types">
          ${pokemon.types.map((type) => `<li class="modal-type">${type}</li>`).join("")}
        </ol>
     </span>
     <h1 class="pokemon-id-modal">#${pokemon.id}</h1>
    </span>

    <img
    class="pokemon-img-modal"
    src="assets/img/${pokemon.name}.png"
    alt="${pokemon.name}"/>

    <img
    class="back-modal"
    src="./assets/img/background.png"
    alt="Imagem de fundo um formato de uma pokebola"/>

    <div class="card-datails">
      <div class="pokemon-abilities">
        <h3 class="title-abilities"> Abilities </h3>
        <ol class="pokemon-abilities">
          ${pokemon.abilities
          .map((ability) => `<li class="abilities"> ${ability} </li>`)}
        </ol>
      </div>
      <div class="status">
        <ol class="pokemon-stats">
          ${pokemon.stats
          .map((stat) => `<li class="stats">${stat}</li>`)
          .join("")}
        </ol>
        <ol class="pokemon-stats">
          ${pokemon.statsInfo
          .map((statsInfo) => `<li class="points">${statsInfo}</li>`)
          .join("")}
        </ol>
      </div>
    </div>
  </div>`;
}

function openDetails(id) {
  const pokemonId = id;
  if (pokemonId == id) {
    return pokeApi.getPokemonUnique(id).then((pokemon) => {
      const newHtml = convertPokeApiDetailsToPokemons(pokemon); 
      pokemonDetail.innerHTML = newHtml;
      modal.classList.toggle("modal-show");
    });
  }
}

// function toggleModal() {
//     modal.classList.toggle("modal-show");
// }

openDetails();
// toggleModal();
