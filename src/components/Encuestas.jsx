import React from "react";
import { onGetEncuesta } from "../firebase/firebase-config";
import { useState, useEffect } from "react";
import s from './Encuestas.module.css'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CircularProgress from '@mui/material/CircularProgress';


const Encuestas = () => {
    const [encuestas, setEncuestas] = useState(false)

    useEffect(() => {
        onGetEncuesta((querySnapshot) => {
            const array = []

            querySnapshot.forEach((doc) => {
                let encuesta = doc.data()
                encuesta.id = doc.id
                array.push(encuesta)
                console.log(encuesta)
            })
            setEncuestas(array)

        })
    }, [])

    return (
        <div className={s.outterDIV}>
            {!encuestas ? <CircularProgress style={{color:'#7cc1da'}} size={100}/> : encuestas.length < 1 ?
                <motion.div className={s.sinEncuestas}
                    initial={{ opacity: 0, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.8 }}
                    viewport={{ once: true }}>
                    <h1>No se encontraron resultados de la encuesta, presiona el botón para crear una</h1>
                    <Link to='/encuesta'>Realizar encuesta</Link>
                </motion.div>
                :
                <motion.div className={s.tablecontainer}
                    initial={{ opacity: 0, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}>
                    <table>
                        <thead><tr>
                            <th>Nombre completo</th>
                            <th>Email</th>
                            <th>Fecha de nacimiento</th>
                            <th>País de origen</th>
                            <th>Terminos y condiciones</th>
                        </tr>
                        </thead>
                        <tbody>
                            {encuestas.length > 0 && encuestas?.map(encuesta => (
                                <tr key={encuesta.id}>
                                    <td>{encuesta.full_name}</td>
                                    <td>{encuesta.email}</td>
                                    <td>{encuesta.birth_date.split('/').reverse().join('/')}</td>
                                    <td>{encuesta.country_of_origin}</td>
                                    <td>{encuesta.terms_and_conditions ? 'Aceptado' : 'Rechazado'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>}

        </div>
    )
}

export default Encuestas