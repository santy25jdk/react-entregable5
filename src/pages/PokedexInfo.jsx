import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokeInfo.css'

const PokedexInfo = () => {

    const {id} = useParams()
    const [pokemon, setPokemon] = useState()
    useEffect( () => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(URL)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err))
    }, [id])

    console.log(pokemon);

  return (
    <div className={`pokeInfo-container ${pokemon?.types[0].type.name !== 'dark' && `bg-${pokemon?.types[0].type.name}`}`} >
      <section className='pokemon__info'>

        <header className={`fondo__header colors-${pokemon?.types[0].type.name}`}>
          <img className='pokeInfo__img' src={pokemon?.sprites.other["official-artwork"].front_default} alt=""/>
        </header>

        <main className='pokeInfo__main'>
          <div className='div__span-id'>
            <span className='pokeInfo__id'>#{pokemon?.id}</span>
          </div>

          <div className='text__name'>
            <h3>{pokemon?.name}</h3>
          </div>

          <div className='pokeInfo__peso-altura'>
            <p className='box-poke'>
              <span>Weigth</span>
              <span>{pokemon?.weight}</span>
            </p>
            <p className='box-poke'>
              <span>Heigth</span>
              <span>{pokemon?.height}</span>
            </p>
          </div>

          <div className='pokeInfo__tipo-habilidad'>

            <article className='pokeInfo__tipo'>
              <h3 className='tipo'>Type</h3>
              <ul className='types-poke'>
                {
                  pokemon?.types.map(type => (
                    <li className={`ul-type colors-${type.type.name}`} key={type.type.url}>{type.type.name}</li>
                  ))
                }
              </ul>
            </article>
            <article className='pokeInfo__habilidad'>
              <h3 className='habilidad'>Skill</h3>
              <ul className='types-poke'>
                {
                  pokemon?.abilities.map(ability => (
                    <li className='ul-ability' key={ability.ability.url}>{ability.ability.name}</li>
                  ))
                }
              </ul>
            </article>
          </div>


          {/* Aca me Quede!! */}
          <div className='Pokeinfo__stats'>
            <div className='box__title-footer'>
              <h2 className='title-footer'>Stats</h2>
            </div>
            <div className='hability__stat'>
              <h3>Hp</h3>
              <h4>{pokemon?.stats[0].base_stat}</h4>
            </div>
            <div className='hability__stat'>
              <h3>Attack</h3>
              <h4>{pokemon?.stats[1].base_stat}</h4>
            </div>
            <div className='hability__stat'>
              <h3>Defending</h3>
              <h4>{pokemon?.stats[2].base_stat}</h4>
            </div>
            <div className='hability__stat'>
              <h3>Speed</h3>
              <h4>{pokemon?.stats[4].base_stat}</h4>
            </div>
          </div>
        </main>
      </section>

      <section className='pokemon-movimientos'>
        <h3>Movements</h3>
        <ul className='box__movements'>
          {
            pokemon?.moves.map(mov => (
              <li className={`list__movement color-${pokemon?.types[0].type.name}`} key={mov.move.url}>{mov.move.name}</li>
            ))
          }
        </ul>
      </section>

    </div>
  )
}

export default PokedexInfo