import { useState, useEffect } from 'react'
import ShowPersons from './components/ShowPersons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])  
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name == newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObj = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        id: persons.length + 1,
      }
      setPersons(persons.concat(nameObj))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = () => {
    if (newFilter == '') {
      return persons
    }
    else {
      return persons.filter(p => p.name.includes(newFilter))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter  newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ShowPersons persons={personsToShow()} />
    </div>
  )
}

export default App