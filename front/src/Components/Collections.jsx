import Layout from "./Layout"
import { useContext, useState, useEffect } from 'react';
import './css/style.css';
import Card from './Card';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { ShoppingCardContext } from './Context';
import ProductDetail from "./ProductDetail";

function Collections() {
  const { jewels } = useContext(ShoppingCardContext);

  // Estado de apertura de los menús
  const [openCollections, setOpenCollections] = useState({});

  useEffect(() => {
    if (jewels && Object.keys(jewels).length > 0) {
      // Configura el estado de apertura (puedes personalizar esto si es necesario)
      setOpenCollections(Object.keys(jewels).reduce((acc, collectionId) => {
        acc[collectionId] = false; // Aquí puedes establecer `true` para abrir por defecto
        return acc;
      }, {}));
    }
  }, [jewels]);

  const handleCollapsable = (collectionId) => {
    setOpenCollections(prevState => ({
      ...prevState,
      [collectionId]: !prevState[collectionId]
    }));
  };

  return (
    <Layout>
      {Object.keys(jewels).map(collectionId => (
        <div key={collectionId} className="mt-20 mb-8 flex flex-col items-center md:mt-40 ">
          <div className='collapsable'>
            <div 
              onClick={() => handleCollapsable(collectionId)}
              className={`w-60 collapsable__content ${openCollections[collectionId] ? 'collapsable__content--open' : ''}`}
            >
              <h2 className="text-xl text-gray-800 font-bold mb-4">{jewels[collectionId].title}</h2>
              <ChevronDownIcon className={`w-6 h-6 text-black-500 collapsable__content--ico ${openCollections[collectionId] ? 'collapsable__content--open' : ''}`} />
            </div>
          </div>
          <div className={`collapsable__items ${openCollections[collectionId] ? 'collapsable__items--open' : ''}`}>
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
      ))}
      <ProductDetail/>
    </Layout>
  );
}

export default Collections;
