import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useContext } from "react";
import { ShoppingCardContext } from "./Context";


function NavBar() {
  const activeStyle = 'underline underline-offset-4';
  const context = useContext(ShoppingCardContext);

  return (

        <nav className="flex justify-between mt-6 items-center fixed z-10 top-0 w-full px-6 text-sm font-light">
            <NavLink to='/'> 
              <img className='w-3/5 md:w-3/5 lg:w-4/5' src={logo} alt="logo" />
            </NavLink>
          
              <ul className="flex items-center gap-3 md:h-20 lg:text-lg ">
                  <li>
                      <NavLink
                      to='/collections'
                      className={({isActive})=> 
                        isActive ? activeStyle : undefined
                      }>
                      Colecciones
                      </NavLink>
                  </li>
                  <li>
                      <NavLink
                      to='/about-me'
                      className={({isActive})=> 
                        isActive ? activeStyle : undefined
                      }>
                      Sobre mí
                      </NavLink>
                  </li>
                  <li className="flex items-center ">
                  <ShoppingBagIcon className="w-6 h-6 text-black-500" />
                    <div>
                      {context.cartProducts.length} 
                    </div>
                  <NavLink to= "/"> </NavLink>
                  </li>
              </ul>
        </nav>
        
  
   
        
    
  )
}

export default NavBar