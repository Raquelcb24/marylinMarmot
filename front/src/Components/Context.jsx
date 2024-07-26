import { createContext, useState, useEffect } from "react";

export const ShoppingCardContext = createContext();

function Context({children}) {

    // variable de estado principal 
    const [jewels, setjewels] = useState([]);
    console.log(jewels)

  useEffect(() => {
    fetch('http://localhost:4000/jewels')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
          console.log('Data from API:', data.results)
          setjewels(data.results);
          
            // Agrupar las joyas por colección
            const groupedJewels = data.results.reduce((acc, jewel) => {
                const { collection_id, collection_title, jewel_id, jewel_title, jewel_price, jewel_image, jewel_category, jewel_description } = jewel;
                if (!acc[collection_id]) {
                    acc[collection_id] = {
                        title: collection_title,
                        jewels: []
                    };
                }
                acc[collection_id].jewels.push({
                    id: jewel_id,
                    title: jewel_title,
                    price: jewel_price,
                    image: jewel_image,
                    category: jewel_category || 'unknown',
                    description: jewel_description
                });
                return acc;
            }, {});

            setjewels(groupedJewels);
        })
        .catch(error => console.error('Error fetching data:', error));
}, []);




    //hacer contador para la cesta
    const [count, setCount] = useState(0)

    //Funcion que modifica en funcion de si esta abierto o no la hoja de detalle. 
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    //Productos que se van a mostrar
    const [productToShow, setProductToShow] = useState({});
    
    //para agregar productos al carrito
    const[cartProducts, setCartProducts] = useState([]);

    //para el menu del checkout
    const [isCheckOutSideMenuOpen, setIsCheckOutSideMenuOpen] = useState(false);
    
    const [order, setOrder] = useState([])

 
    

  return (
    <ShoppingCardContext.Provider value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckOutSideMenuOpen,
        openCheckOutSideMenu: () => setIsCheckOutSideMenuOpen(true),
        closeCheckOutSideMenu: () => setIsCheckOutSideMenuOpen(false),
        order,
        setOrder,
        jewels,
        setjewels,

        
        
    }}>
        {children}
    </ShoppingCardContext.Provider>
   
  )
}

export default Context