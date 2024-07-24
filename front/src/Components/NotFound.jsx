import Layout from "./Layout"
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

function NotFound() {
  return (
    <Layout>
      
      <p className="m-20 text-xl text-slate-700 flex flex-col">
      <ExclamationCircleIcon className="w-10 h-10 " />
      Upps! Parece que la página que buscas no existe </p>
        
    </Layout>
    
  )
}

export default NotFound