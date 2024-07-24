

function FilterByName({inputChange, filterName}) {
    const handleKeyDown =(event)=>{
        if(event.key === "Enter"){
          event.preventDefault();
        }
      }
  return (
    <input 
          className='block w-60 px-4 py-2 mt-8 mb-6 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-md'
          type="text" 
          placeholder='Busca un producto'
          value={filterName}
          onChange={inputChange}
          onKeyDown={handleKeyDown}
        />
  )
}

export default FilterByName