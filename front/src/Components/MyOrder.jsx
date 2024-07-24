import Layout from "./Layout"
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ShoppingCardContext } from './Context';
import OrderCard from './OrderCard';

function MyOrder() {
  const context = useContext(ShoppingCardContext);
  const currrentPath = window.location.pathname;
  let index = currrentPath.substring(currrentPath.lastIndexOf('/')+1);
  if (index==='last') index = context.order?.length - 1;

  return (
    <Layout>
        <div className='flex items-center justify-center h-20 mt-10 w-80 md:h-20 md:mt-32 lg:mt-40 relative mb-6'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className="w-6 h-6 text-black-500 cursor-pointer" />
        </Link>
        <h1 className='font-medium text-xl'>Resumen de mi pedido</h1>
        </div>
        <div className='flex flex-col w-80'>
            {
                context.order?.[index]?.products.map(product => (
                  <OrderCard 
                  key={product.id}
                  id={product.id}
                  title={product.title} 
                  imageUrl={product.image}
                  price={product.price}
                  />
                ))
            }
        </div>
    </Layout>
    
  )
}

export default MyOrder