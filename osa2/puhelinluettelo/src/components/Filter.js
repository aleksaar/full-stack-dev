const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <>
        <form>
            filter names: 
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