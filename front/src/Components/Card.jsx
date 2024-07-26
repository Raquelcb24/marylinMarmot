import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useContext } from "react";
import { ShoppingCardContext } from "./Context";


function Card({ id, title, price, image, category, description }) {
  const context = useContext(ShoppingCardContext); //quiero que leas el estado global
  
  const showProduct = (productDetail) => { //funcion para mostrar el detalle del producto
    context.openProductDetail();
    context.setProductToShow(productDetail);
  }
  const productDetail = {
    id,
    title,
    price,
    image,
    category, 
    description
  };

  const addProductToCart = (event, productDetail) => { //funcion para agregar el producto al carrito
    event.stopPropagation();
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productDetail]);
    context.openCheckOutSideMenu();
    context.closeProductDetail();
    console.log('cart :', context.cartProducts)
  }


  
  const renderIcon = (id)=>{

    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div 
        className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1"> 
        <CheckIcon className="w-6 h-6 text-white" />
        </div>
      )
    } else {
      return(
        <div 
        className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1" 
          onClick={(event)=> addProductToCart(event, productDetail)}> 
          <PlusIcon className="w-6 h-6 text-black-500" />
      </div>
      )
     
    }

  }

  return (
    <div 
    onClick={()=> showProduct(productDetail)}
    className="bg-white cursor-pointer  w-56 h-60 rounded-lg">
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{category}</span>
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={title} />
        {renderIcon(productDetail.id)}
      </figure>
      <p className="flex justify-between px-2">
        <span className="text-sm font-light">{title}</span>
        <span className="text-lg font-medium">{price}€</span>
      </p>
    </div>
  );
}

export default Card;
