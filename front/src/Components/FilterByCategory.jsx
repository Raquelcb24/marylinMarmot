

function FilterByCategory({filterCategory, setFilterCategory}) {
    const handleChange= (event)=>{
        setFilterCategory(event.target.value)
    }
  return (
    <select 
        className='block w-60 px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-md' 
        name="categories" 
        id="categories"
        onChange={handleChange}
        value={filterCategory}>
          <option className='focus:bg-indigo-500' value="all">Buscar por categoría</option>
          <option value="earrings">Pendientes</option>
          <option value="necklaces">Collares</option>
          <option value="rings">Anillos</option>
        </select>
  )
}

export default FilterByCategory