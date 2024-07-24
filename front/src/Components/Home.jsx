import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/style.css'
import Card from './Card';
import Layout from './Layout';
import ProductDetail from './ProductDetail';
import FilterByName from './FilterByName';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { ShoppingCardContext } from './Context';
import FilterByCategory from './FilterByCategory';


function Home() {
  const { jewels } = useContext(ShoppingCardContext);
  const location = useLocation();

   console.log("jewels:", jewels);

   //filtrar por nombre
  const [filterName, setFilterName] = useState("")
  const [filterCategory, setFilterCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState([])

  //para poder buscar ignorando los acentos
  const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
    
  useEffect(() => {
   if (jewels && Object.keys(jewels).length > 0) {
      // Convertir el objeto jewels a un array plano de joyas
      const allJewels = Object.values(jewels).flatMap(obj => obj.jewels);
      console.log("Todos los jewels:", allJewels);

     // Filtrar las joyas basadas en el título y categoria 
     const filtered = allJewels
     .filter((jewel) => {
      const matchesName = removeDiacritics(jewel.title.toLowerCase()).includes(removeDiacritics(filterName.toLowerCase()));

      let matchesCategory = false;

      switch (filterCategory) {
        case "all":
          matchesCategory = true;
          break;
        case "earrings":
          matchesCategory = jewel.category === "earrings";
          break;
        case "necklaces":
          matchesCategory = jewel.category === "necklaces";
          break;
        case "rings":
          matchesCategory = jewel.category === "rings";
          break;
        default:
          matchesCategory = false;
      }

      return matchesName && matchesCategory;
    })
    
    setFilteredItems(filtered);
    console.log("Filtered items:", filtered);
  }
   // Configurar el estado de apertura por defecto
   if (location.pathname === '/') {
    setOpenCollections(Object.keys(jewels).reduce((acc, collectionId) => {
      acc[collectionId] = true; // Abre todos los menús por defecto
      return acc;
    }, {}));
  }
}, [filterName, filterCategory, jewels, location.pathname]);


   const inputChange = (event) => {
     setFilterName(event.target.value.toLowerCase())
   }

  //collapsables
  const [openCollections, setOpenCollections] = useState({});

  const handleCollapsable = (collectionId) => {
    setOpenCollections(prevState => ({
      ...prevState,
      [collectionId]: !prevState[collectionId]
    }));
  };


  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-80 relative mb-6 mt-10">
        <FilterByName
        inputChange={inputChange}
        value={filterName}/> 
        <FilterByCategory
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory} />
      </div>
      
       {filterName || filterCategory !== "all" ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredItems.length > 0 ? (
            filteredItems.map(jewel => (
              <Card
                key={jewel.id}
                id={jewel.id}
                title={jewel.title}
                price={jewel.price}
                image={jewel.image}
                category="Filtrado"
              />
            ))
          ) : (
            <div>No se encontraron elementos</div>
          )}
        </div>
      ) : (
       
        Object.keys(jewels).map(collectionId => (
          <div key={collectionId} className="mb-8 flex flex-col items-center">
            <div className='collapsable mb-8 flex flex-col items-center'>
              <div 
               onClick={() => handleCollapsable(collectionId)}
               className={`w-60 md:w-80 lg:w-96 collapsable__content ${openCollections[collectionId] ? 'collapsable__content--open' : ''}`}>
                <h2 className="flex flex-col items-center  text-gray-800 font-bold text-lg mb-4">{jewels[collectionId].title}</h2>
                <ChevronDownIcon className={`w-6 h-6 text-black-500 collapsable__content--ico ${openCollections[collectionId] ? 'collapsable__content--open' : ''}`} />
              </div>
            </div>
            
            <div className={` collapsable__items ${openCollections[collectionId] ? 'collapsable__items--open' : ''}`}>
              {jewels[collectionId].jewels.map(jewel => (
                <Card
                  key={jewel.id}
                  id={jewel.id}
                  title={jewel.title}
                  price={jewel.price}
                  image={jewel.image}
                  category={jewels[collectionId].title}
                />
              ))}
            </div>
          </div>
        ))
      )}

      <ProductDetail />
    </Layout>
  );
}

export default Home;
