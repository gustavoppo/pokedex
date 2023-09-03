const pokemonDetail = document.getElementById("pokemonDetail");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function createTypeElements(types) {
  return types.map((type) => `<li class="modal-type">${type}</li>`).join("");
}

function createAbilityElements(abilities) {
  return abilities
    .map((ability) => `<li class="abilities">${ability}</li>`)
    .join( "," + " ");
}

function createStatElements(stats) {
  return stats.map((stat) => `<li class="stats">${stat}</li>`).join("");
}

function createStatPointsElements(stats) {
  return stats.map((stat) => `<li class="points">${stat}</li>`).join("");
}

function createStatBarElements(statsInfo) {
  return statsInfo
    .map(
      (statsInfo) => `
    <li class="skills stat-bar" data-value="${statsInfo}">
      <span class="${statsInfo}"></span>
    </li>`
    )
    .join("");
}

function convertPokeApiDetailsToPokemons(pokemon) {
  return `
  <span class="close-modal"  onclick="toggleModal()"></span>
  <div class="modal-content ${pokemon.type}">
    <span class="title-modal">
     <span class="pokemon-details-modal">
      <h1 class="pokemon-name-modal">${pokemon.name}</h1>
        <ol class="modal-types">
          ${createTypeElements(pokemon.types)}
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
          ${createAbilityElements(pokemon.abilities)}
        </ol>
      </div>
      <section class="divider"></section>
      <div class="status">
        <div class="status-left">
          <ol class="pokemon-stats">
            ${createStatElements(pokemon.stats)}
          </ol>
          <ol class="pokemon-stats points">
            ${createStatPointsElements(pokemon.statsInfo)}
          </ol>
        </div>
        <ol class="pokemon-skills">
          ${createStatBarElements(pokemon.statsInfo)}
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
      const statBars = document.querySelectorAll(".stat-bar");
      statBars.forEach((bar) => {
        const statValue = bar.getAttribute("data-value");
        const span = bar.querySelector("span");

        if (statValue <= 25) {
          span.style.background = "#dd2828";
        } else if (statValue > 25 && statValue <= 50) {
          span.style.background = "#fd5826";
        } else {
          span.style.background = "#0fbb14";
        }

        span.style.display = "block";
        span.style.width = statValue + "%";
        span.style.height = "100%";
        span.style.borderRadius = "1rem";
      });
    });
  }
}

function toggleModal() {
  modal.classList.toggle("modal-show");
}

openDetails(1);
closeModal();
