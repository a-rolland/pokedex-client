import React, { useState, useEffect } from 'react'
import "./styles.css"
import pokedexService from "../../services/pokedexService";

const Homepage = props => {

  const [pokemon, setPokemon] = useState()

  const [myPokemons, setMyPokemons] = useState([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
      .then(response => {
        response.json().then(pokemon => {
          setPokemon(pokemon)
          pokedexService.getPokemons()
            .then(res => {
              console.log("FOUND PKMNS",res)
              setMyPokemons(res)
          })
      })
    })
    .catch(err => err)
  }, [props.id]);

  const newRandom = () => {
    const newId = Math.floor(Math.random() * Math.floor(151))
    fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
      .then(response => {
        response.json().then(pokemon => {
          setPokemon(pokemon)
      })
    })
    .catch(err => err)
  }

  const addToPokedex = () => {
    const pokemonObj = {
      name: pokemon.name,
      img: pokemon.sprites.front_default,
      id: pokemon.id,  
    }
    console.log(pokemonObj)
    pokedexService.newPokemon(pokemonObj)
      .then(response => {
        console.log(response)
        pokedexService.getPokemons()
            .then(res => {
              console.log("FOUND PKMNS",res)
              setMyPokemons(res)
            })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const myPokemonsList = myPokemons.map(elem => {
    return (
      <li key={elem.id}>
        <h2>{elem.name}</h2>
        <img src={elem.img} alt="pkmn"/>
      </li>
    )
  })
  
  return (
    <div id="pokemon-container">
      <h1>Welcome to the Pokédex App !</h1>
      { pokemon && 
        <>
        <h2>Pokemon : {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h2>
        <img src={pokemon.sprites.front_default} alt="Pokemon"/>
        </>
      }
      <button onClick={newRandom}>Random Pokémon</button>
      <button onClick={addToPokedex}>Add to your Pokédex</button>
      <h2>My Pokemons</h2>
      {
        myPokemons &&
          myPokemonsList
      }
    </div>
  )
}

export default Homepage;
