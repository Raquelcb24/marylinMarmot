import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react'
import { ShoppingCardContext } from './Context';
import {getCurrentDate} from './js/index';

function OrdersCard(props) {
    const context = useContext(ShoppingCardContext);
    const { totalPrice, totalProducts } = props;


  return (
    <div className="flex justify-between items-center border border-black w-80 p-4 rounded-lg mb-4">
    <div className="flex justify-between w-full">
      <p className="flex flex-col">
        <span>{getCurrentDate()}</span>
        <span className="font-light">{totalProducts} Articles</span>
      </p>
      <p className='flex gap-2 items-center'>
        <span className="font-medium text-2xl">{totalPrice}€</span>
        <ChevronRightIcon className="w-6 h-6 text-black-500 cursor-pointer" />
      </p>
        
    </div>
</div>
  )
}

export default OrdersCard