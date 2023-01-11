import React from "react";
import { Link } from "react-router-dom";
import s from './HomeIndex.module.css'

const HomeIndex = () =>{
    return (
        <div className={s.outterDIV}>
            <h1>Hola, bienvenido a la app de encuestas!</h1>
            <h4>{`Esta aplicación es parte de una prueba técnica para el puesto de desarrollador Front End de Luan, así que agradezco la oportunidad y espero que sea de su agrado :)`}</h4>
            <h2>Presiona el botón para iniciar la encuesta</h2>
            <Link to='/encuesta'>Iniciar Encuesta</Link>
        </div>
    )
}

export default HomeIndex