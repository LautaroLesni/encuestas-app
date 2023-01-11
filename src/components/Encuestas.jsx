import React from "react";
import { onGetEncuesta } from "../firebase/firebase-config";
import { useState, useEffect } from "react";
import s from './Encuestas.module.css'
import { Link } from "react-router-dom";


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
            {!encuestas ? <h1>Loading...</h1> : encuestas.length < 1 ? 
            <div className={s.sinEncuestas}>
                <h1>No se encontraron resultados de la encuesta, presiona el botón para crear una</h1>
                <Link to='/encuesta'>Realizar encuesta</Link>
                </div> 
                :
                <div className={s.tablecontainer}>
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
                </div>}

        </div>
    )
}

export default Encuestas