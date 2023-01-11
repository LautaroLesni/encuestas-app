import React from "react";
import s from './Navbar.module.css'
import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <div className={s.NavbarDIV}>
            <ul>
                <li><Link to='/'>Inicio</Link></li>
                <li><Link to='/encuesta'>Encuesta</Link></li>
                <li><Link to='/resultados'>Resultados</Link></li>
            </ul>
        </div>
    )
}

export default Navbar