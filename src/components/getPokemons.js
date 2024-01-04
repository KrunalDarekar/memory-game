const getPokemonData = async (pokemon) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    const data = await res.json()
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_shiny
    }
}   

const getPokemons = async () => {
    const pokemonNames = [
        'pikachu',
        'charizard',
        'bulbasaur',
        'squirtle',
        'jigglypuff',
        'eevee',
        'snorlax',
        'mewtwo'
    ];
    const promises = pokemonNames.map(async (pokemon) => {
        return await getPokemonData(pokemon);
    });
    
    const dataArr = await Promise.all(promises);
    return dataArr;
}

export default getPokemons;