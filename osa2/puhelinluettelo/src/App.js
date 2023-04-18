import { useState, useEffect } from 'react';
import personService from './services/persons'
import axios from 'axios'
import FilterPerson from './FilterPerson';
import PersonForm  from './PersonForm';
import Persons  from './Persons';
import Notification from './Notification';

const App = () => {
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNameNumber, setnewNameNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMsg, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    event.preventDefault();
    setnewNameNumber(event.target.value);

  }

  const handleFilterValueChange = (event) => {
    event.preventDefault();
    setFilterValue(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName);
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        updatePersonNumber({...existingPerson, phoneNumber: newNameNumber});
      }
    } else {
      const newPerson = { name: newName, phoneNumber: newNameNumber};
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));

          setNotification(
            `Added ${newPerson.name}`
          )
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
          }, 3000)
        });
    }
    setNewName('');
    setnewNameNumber('');
  }

  const updatePersonNumber = (person) => {
    personService
      .update(person.id, person)
      .then(response => {
        setPersons(persons.map(p => p.id === person.id ? response.data : p));

        setNotification(
          `Updated person's ${person.name} information`
        )
        setNotificationType('success')
        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
      })        
      .catch(error => {
        setNotification(
          `Person ${person.name} is removed, couldn't update information`
        )
        setNotificationType('error')
        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
      });
  }

  const deletePerson = (event, person) => {
    event.preventDefault();

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(response => {
          let personsList = [...persons];
          setPersons(personsList.filter(p => p.id !== person.id))

          setNotification(
            `Person ${person.name} deleted successfully`
          )
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
          }, 3000)
        })
        .catch(error => {
          setNotification(
            `Person ${person.name} is already removed`
          )
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
          }, 3000)
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMsg} type={notificationType}/>
      <FilterPerson filterValue={filterValue} onChange={handleFilterValueChange}/>

      <h2>Add a new</h2>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNameNumber={newNameNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
        <Persons persons={persons} filterValue={filterValue} deletePerson={deletePerson}/>
    </div>
  )
}

export default App