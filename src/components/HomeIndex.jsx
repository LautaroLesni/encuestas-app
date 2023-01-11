import React from "react";
import { Link } from "react-router-dom";
import s from './HomeIndex.module.css'
import { motion } from 'framer-motion'

const HomeIndex = () => {
    return (
        <div className={s.outterDIV}>
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -350 }}
                    whileInView={{ opacity: 1, y: -150 }}
                    transition={{ delay: 0, duration: 0.8 }}
                    viewport={{ once: true }}>
                    Hola, bienvenido a la app de encuestas!</motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -200 }}
                    whileInView={{ opacity: 1, y: -150 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    viewport={{ once: true }}>Esta aplicación/web es parte de una prueba técnica para el puesto de desarrollador Front End de Luan, así que <br />agradezco la oportunidad y espero que sea de su agrado</motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: -125 }}
                    whileInView={{ opacity: 1, y: -125 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                    viewport={{ once: true }}>Presiona el botón para iniciar la encuesta</motion.h2>
                <motion.div
                    className={s.divButton}
                    initial={{ opacity: 0, y: -110 }}
                    whileInView={{ opacity: 1, y: -110 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                    viewport={{ once: true }}>
                    <Link to='/encuesta'>Iniciar Encuesta</Link>
                </motion.div>
            </div>
        </div>
    )
}

export default HomeIndex