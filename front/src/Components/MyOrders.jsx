import Layout from "./Layout"
import OrdersCard from "./OrdersCard"
import { useContext } from 'react'
import { ShoppingCardContext } from './Context';
import { Link } from 'react-router-dom';



function MyOrders() {
  const context = useContext(ShoppingCardContext);

  return (
    <Layout>
      <div className='flex items-center justify-center w-80 relative mb-4 mt-40'>
          <h1 className='font-medium text-xl'>Mis pedidos</h1>
      </div>
      
      {
        context.order.map((order, index)=>(
        <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard 
              totalPrice={order.totalPrice} 
              totalProducts={order.totalProducts}/>
         </Link>
        ))
      }
      
    </Layout>
  )
}

export default MyOrders