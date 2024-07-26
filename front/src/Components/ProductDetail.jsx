import './css/style.css'
import { useContext } from 'react';
import { ShoppingCardContext } from './Context';
import { XMarkIcon } from '@heroicons/react/24/solid';

function ProductDetail() {
    const context = useContext(ShoppingCardContext);
    console.log('product to show: ', context.productToShow);
  return (
    <aside className=  {` productDetail ${context.isProductDetailOpen ? 'flex' : 'hidden'}  flex flex-col fixed right-0 bottom-0 border border-black rounded-lg bg-white mt-0 items-center`}>
        <div className='flex justify-between  p-6'>
              <h2 className='font-medium text-lg 2xl:text-2xl'>Detalle</h2>
              <XMarkIcon className="w-6 h-6 absolute top-0 right-0 m-6 text-black-500 cursor-pointer " 
                onClick={()=> context.closeProductDetail()}/>
            </div>
        
        <figure className='px-6 flex justify-center items-center '>
            <img className="w-full h-52 rounded-lg" src={context.productToShow.image} alt={context.productToShow.title} />
        </figure>
        <p className='flex flex-col p-4 items-center'>
            <span className="text-sm font-light 2xl:text-2xl">{context.productToShow.title}</span>
            <span className="text-xs font-light 2xl:text-2xl">{context.productToShow.description}</span>
            <span className="text-sm font-medium mb-1 2xl:text-2xl">{context.productToShow.price}€</span>
        </p>
    </aside>
  )
}

export default ProductDetail