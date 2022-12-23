import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ErrorFetch from '../components/ErrorFetch'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'

const Pokedex = () => {

  const {trainer} = useSelector(state => state)

  const [pokemons, setPokemons] = useState()
  const [types, setTypes] = useState()
  const [typeSelect, setTypeSelect] = useState('All pokemons')

  const [hasError, setHasError] = useState(false)

  const navigate = useNavigate()

  useEffect( () => {
    if(typeSelect !== 'All pokemons'){
      axios.get(typeSelect)
      .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
      .catch(err => console.log(err))
    }else {
      const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000000'
      axios.get(URL)
      .then(res => {
          setPokemons(res.data.results)
          setHasError(false)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })
    }
  }, [typeSelect])

  useEffect( () => {
    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
    .then(res => setTypes(res.data.results))
    .catch(err => console.log(err))
  }, [])

  const namePoke = pokemons?.map(e => e.name)
  const handleSubmit = e => {
    if(e.target.search.value !== ''){
      e.preventDefault()
    let input = e.target.search.value.trim().toLowerCase()
    for(let i=0 ; i<namePoke.length ; i++){
      if(namePoke[i] === input){
        navigate(`/pokedex/${input}`)
      }else{
        setHasError(true)
        console.log('No existe')
      }
    }
    }
  }

  const handleChange = e => {
    setTypeSelect(e.target.value)
    setPage(1)
  }

  //Logica de la paginacion
  const [page, setPage] = useState(1)
  const [pokePerPage, setPokePerPage] = useState(8)
  const initialPoke = (page - 1) * pokePerPage
  const finalPoke = page * pokePerPage
  const maxPages = pokemons && Math.ceil(pokemons.length / pokePerPage)


  return (
    <div className='pokedex__principal'>
      <header className='pokedex__header'>
        <h2><span className='pokedex__span'>Wellcome {trainer}</span>, here you can find your favorite pokemon.</h2>
        <article className='box__article'>
          <form className='pokedex__form' onSubmit={handleSubmit}>
            <input className='pokedex__input' id='search' type="text" placeholder='look for a pokemon' />
            <button className='pokedex__button'>Search</button>
          </form>

          <select className='select' onChange={handleChange}>
            <option className='option' value={'All pokemons'}>All pokemons</option>
            {
              types?.map(type => (
                <option className='option' value={type.url} key={type.url}>{type.name}</option>
              ))
            }
          </select>
        </article>
      </header>
      {
        hasError ?
        <ErrorFetch />
        :
        <section className='section-container'>        
          <div className='poke__container'>
            {
              pokemons?.slice(initialPoke, finalPoke).map(poke => (
                <PokeCard key={poke.url} url={poke.url} />
                ))
            }
          </div>
          <Pagination page={page} maxPages={maxPages} setPage={setPage} />
        </section>
      }
    </div>
  )
}

export default Pokedex