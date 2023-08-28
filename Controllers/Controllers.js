export async function buscarPokemon(url) {
  let urlParaBuscar = url || "https://pokeapi.co/api/v2/pokemon/";

  let data = await fetch(urlParaBuscar);
  let dataParseada = await data.json();

  let arrayDePokemones = [];

  for (let i = 0; i < dataParseada.results.length; i++) {
    const pokemon = dataParseada.results[i];

    let pokemonData = await fetch(pokemon.url);
    let pokemonParseado = await pokemonData.json();

    let pokemonFormateado = {
      id: pokemonParseado.id,
      nombre: pokemonParseado.name,
      tipos: pokemonParseado.types,
      imagen: pokemonParseado.sprites.other.dream_world.front_default,
    };

    arrayDePokemones.push(pokemonFormateado);
  }

  return {
    previous: dataParseada.previous,
    next: dataParseada.next,
    arrayDePokemones: arrayDePokemones,
  };
}

export async function buscarPokemonPorNombre(nombre) {
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

  let pokemonParseado = await data.json();

  let pokemonFormateado = {
    id: pokemonParseado.id,
    nombre: pokemonParseado.name,
    tipos: pokemonParseado.types,
    imagen: pokemonParseado.sprites.other.dream_world.front_default,
  };
  return pokemonFormateado;
}

export async function paginaSiguiente() {}

export async function paginaAnterior() {}
