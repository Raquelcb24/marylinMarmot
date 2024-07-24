import './css/style.css'
import { Link } from 'react-router-dom';
import OrderCard from './OrderCard';
import { totalPrice } from './js/index';
import { useContext } from 'react';
import { ShoppingCardContext } from './Context';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {getCurrentDate} from './js/index';

function CheckoutMenu() {
    const context = useContext(ShoppingCardContext);

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id);
        context.setCartProducts(filteredProducts);
    }


    
    const handleCheckout = () => {
        const orderToAdd = {
          date: getCurrentDate(),
          products: context.cartProducts,
          totalProducts: context.cartProducts.length,
          totalPrice: totalPrice(context.cartProducts)
    
        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setFilterByName(null)
        
      };

  return (
    <aside 
    className=  {`${context.isCheckOutSideMenuOpen ? 'flex' : 'hidden'} productDetail flex flex-col fixed right-0 bottom-0 border border-black rounded-lg bg-white mt-0`}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-medium 2xl:text-2xl'>Detalle del pedido</h2>
            <div>
            <XMarkIcon 
                className="w-6 h-6 text-black-500 cursor-pointer " 
                onClick={()=> context.closeCheckOutSideMenu()}/>
            </div>
        </div>
        <div className='px-6 overflow-y-scroll flex-1 '>
            {
                context.cartProducts.map((product)=>{
                    return <OrderCard 
                        key={product.id}
                        id={product.id}
                        title={product.title} 
                        imageUrl={product.image}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                })
            }
        </div>
       <div className='px-6'>
            <p className='flex justify-between items-center mb-2'>
                <span className='font-light'>Total: </span>
                <span className='font-medium text-xl'>{totalPrice(context.cartProducts)}€</span>
            </p>
            <Link to='my-orders/last'>
                <button className='bg-black py-3 mb-4 w-full text-white rounded-lg' onClick={()=>handleCheckout()}>Proceder al pago</button>
            </Link>
            
       </div>
    </aside>
  )
}

export default CheckoutMenu