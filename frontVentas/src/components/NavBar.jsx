import './NavBar.css'
import { Link } from 'react-router-dom';


export const NavBar = () => {
  return (
    <nav className='NavBar'>
        <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/RegistroVenta">ventas</Link></li>
           <li><Link to="/Registro">Registro</Link></li>
           <li><Link to="/RegistroProducto">productos</Link></li>
        </ul>
    </nav>
  )
}
