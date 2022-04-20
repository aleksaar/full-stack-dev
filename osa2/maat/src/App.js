import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'

const App = (props) => {
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])


  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = () => {
    return countries.filter(c => c.name.common.toLowerCase().includes(newFilter))
  }

  return (
    <div>
      <h1>Countries</h1>
        <Filter text ={"find countries"} newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        <ShowCountries countries={countriesToShow()} />
    </div>
  )
}

export default App