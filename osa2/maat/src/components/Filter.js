const Filter = ({text, newFilter, handleFilterChange}) => {
    return (
        <>
        <form>
            {text}
            <input 
            type="text" 
            value={newFilter}
            onChange={handleFilterChange} 
            />
        </form>
      </>
    )
}

export default Filter