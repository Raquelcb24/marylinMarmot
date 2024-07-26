import Layout from "./Layout"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";




function Footer() {
    const activeStyle = 'underline underline-offset-4';
  return (
    <Layout>
        <footer className="w-full border-t h-auto flex flex-col items-center p-6 font-light lg:p-20 lg:text-xl">
           
                <span >
                    <NavLink 
                    to="/about-me"
                    className={ ({isActive})=> isActive ? activeStyle : undefined
                    }>
                    Sobre mí
                    </NavLink>
                </span>
                
           
            <ul className=" mt-6 flex flex-col items-center  font-medium">Contacto
                <li className="font-light">
                <a
                href="https://www.instagram.com/by_marylin.marmot/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <span>Sígueme en Instagram</span>
                <FontAwesomeIcon className="w-6 h-6 text-black-500" icon={faInstagram} />
              </a></li>
                <li className="font-light cursor-pointer"><a
                href="https://wa.me/34657403127?text=Hola,%20me%20encantan%20tus%20diseños!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <span>Disponible en Whatsapp</span>
                <FontAwesomeIcon className="w-6 h-6 text-black-500 cursor-pointer" icon={faWhatsapp} />
              </a></li>
                <li className="text-xs font-light mt-6">© by Marylin Marmot 2024</li>
            </ul>
        </footer>
    </Layout>
    
  )
}

export default Footer