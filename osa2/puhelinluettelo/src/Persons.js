const Persons = (props) => {
    return (
        <div>
            {props.persons.filter(p => props.filterValue ? p.name.toLowerCase().includes(props.filterValue.toLowerCase()) : p.name).map((p, i) => (
                <div style={{ display: 'flex', height: '25px', alignItems: 'center' }} key={i}>
                    <p style={{ marginRight: '15px'}}>{p.name} {p.phoneNumber}</p>
                    <button style={{ float: 'right'}} onClick={(e) => props.deletePerson(e, p)}>delete</button>
                </div>
            ))}
        </div>
    )
}

export default Persons;