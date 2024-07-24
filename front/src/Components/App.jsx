import { useRoutes, BrowserRouter } from 'react-router-dom'
import Context from './Context'
import Home from './Home'
import Collections from './Collections'
import MyOrder from './MyOrder'
import MyOrders from './MyOrders'
import NotFound from './NotFound'
import NavBar from './NavBar'
import CheckoutMenu from './CheckoutMenu'
import AboutMe from './AboutMe'
import '../App.css'
import Footer from './Footer'


const AppRouter = () => {
  let routes = useRoutes([
    {path:'/', element:<Home/>},
    {path:'/collections', element:<Collections/>},
    {path:'/my-order', element:<MyOrder/>},
    {path:'/my-orders', element:<MyOrders/>},
    {path:'my-orders/last', element:<MyOrder/>},
    { path: '/my-orders/:id', element: <MyOrder/> },
    { path: '/about-me', element: <AboutMe/>},
    {path:'*', element:<NotFound/>}
  ])
  return routes
}

function App() {

  return (
    <Context>
      <BrowserRouter>
        <AppRouter/>
        <NavBar/>
        <CheckoutMenu />
        <Footer/>
      </BrowserRouter>
    </Context>
    
   
  )
}

export default App
