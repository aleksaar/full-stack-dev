const ShowPersons = ({persons, delPerson}) => {
    return (
        <>
        <ul>
            {persons.map(person => 
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => delPerson(person)}>delete</button>
            </li>
            )}
        </ul>
        </>
    )
}

export default ShowPersons