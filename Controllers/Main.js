import { buscarPokemon, buscarPokemonPorNombre } from "./Controllers.js";
let root = document.getElementById("root");
let botonDeBusqueda = document.getElementById("buscar-pokemon");
let barraDeBusqueda = document.getElementById("barra-pokemon");
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let previousUrl = "";
let nextUrl = "";
let html = "";

root.innerHTML = "CARGANDO";

async function mostrarPokemones(url) {
  root.innerHTML = "CARGANDO";

  let objetoPokemon = await buscarPokemon(url);

  previousUrl = objetoPokemon.previous;
  nextUrl = objetoPokemon.next;

  objetoPokemon.arrayDePokemones.forEach((pokemon) => {
    let cardPokemon = `<div class= 'card'>
            <span>${pokemon.nombre}</span>
               <img class= 'card-image' src ='${pokemon.imagen}'/>
           </div>`;

    html += cardPokemon;
  });

  root.innerHTML = html;
}

previousBtn.addEventListener("click", async () => {
  mostrarPokemones(previousUrl);
});
nextBtn.addEventListener("click", async () => {
  mostrarPokemones(nextUrl);
});

botonDeBusqueda.addEventListener("click", async () => {
  let nombrePokemon = barraDeBusqueda.value;
  if (nombrePokemon) {
    let pokemonEncontrado = await buscarPokemonPorNombre(nombrePokemon);
    if (pokemonEncontrado) {
      root.innerHTML =
      
      `<div class= 'card'>
                    <span>${pokemonEncontrado.nombre}</span>
                    <span>${pokemonEncontrado.id}</span>
                    <span>${pokemonEncontrado.tipos[0].type.name}</span>
                    <img class= 'card-image' src ='${pokemonEncontrado.imagen}'/>
                </div> `;
    } else {
      root.innerHTML = "No se encontró ningún Pokémon con ese nombre.";
    }
  } else {
    root.innerHTML = "Ingrese un nombre de Pokémon válido.";
  }
});

mostrarPokemones();
