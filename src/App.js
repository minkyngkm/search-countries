import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [ search, setSearch ] = useState("")
  const [ countries, setCountries ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get("https://restcountries.eu/rest/v2/all")
    .then( res => {
      setCountries(res.data) 
      setLoading (false)} )
    .catch( err => console.log(err))
  }, [])

  useEffect(() => {
    setFilteredCountries(
      countries.filter( country  => country.name.toLowerCase().includes(search.toLowerCase()))
    )
  }, [countries,search])

  if(loading){
    return <div> Currently loading...</div>
  }
  return (
    <div className="App">
      <h1> Countries Information </h1>
      <input className="search-bar" type="text" placeholder="Search for a country..." onChange={ e => setSearch(e.target.value)}/>
      <div className="countries-info-container">
        {filteredCountries.map( (country, index)=> <CountriesDetails key={index} {...country}></CountriesDetails>)}
      </div>
      
    </div>
  );
}

function CountriesDetails (props) {
  const { name, flag } = props
  return (
    <div className="countries-info"> 
      {name}
      <img src={flag} alt={name}/>
    </div>
       
  )
}

export default App;