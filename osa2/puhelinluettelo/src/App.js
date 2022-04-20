import { useState, useEffect } from 'react'
import ShowPersons from './components/ShowPersons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import pbService from './services/phonebook'
import Notification from './components/Notification'


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])  
  const [newFilter, setNewFilter] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const hook = () => {
    pbService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updated = {...person, number: newNumber}
        pbService
          .update(person.id, updated)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : updated))
            setActionMessage(`${newName} number changed`)
            setTimeout(() => {
              setActionMessage(null)
            }, 5000)
          })
          .catch(error => {
            setActionMessage(`${newName} was already removed from server`)
            setIsError(true)
            setTimeout(() => {
              setActionMessage(null)
              setIsError(false)
            }, 5000)
        })
      }
    }
    else {
      const nameObj = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        id: persons.length + 1,
      }
      pbService.create(nameObj)
        .then(() => {
          setPersons(persons.concat(nameObj))
          setActionMessage(`${newName} added`)
          setTimeout(() => {
            setActionMessage(null)
          }, 5000)
        })
        .catch(error => {
          setActionMessage(`${newName} was already added to server`)
          setIsError(true)
          setTimeout(() => {
            setActionMessage(null)
            setIsError(false)
          }, 5000)
        })
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      pbService
      .deleteEntry(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setActionMessage(`${person.name} deleted`)
          setTimeout(() => {
            setActionMessage(null)
          }, 5000)
      })
      .catch(error => {
        setActionMessage(`${person.name} was already removed from server`)
        setIsError(true)
        setTimeout(() => {
          setActionMessage(null)
          setIsError(false)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={actionMessage} isError={isError}/>
      <Filter  newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ShowPersons persons={personsToShow()} delPerson={deletePerson} />
    </div>
  )
}

export default App