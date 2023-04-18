const FilterPerson = (props) => {
    return (
        <div>
            filter shown with <input value={props.filterValue} onChange={(event) => props.onChange(event)} />  
        </div>
    )
}

export default FilterPerson;