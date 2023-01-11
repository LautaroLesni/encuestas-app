import { QuerySnapshot } from "firebase/firestore";
import React from "react";
import { getEncuesta, onGetEncuesta } from "../firebase/firebase-config";
import { useState, useEffect } from "react";
import s from './Encuestas.module.css'


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
            <div className={s.databaseDIV}>
                    <div className={s.tagsDIV}>
                        <ul>
                            <li>Nombre completo</li>
                            <li>Email</li>
                            <li>Fecha de nacimiento</li>
                            <li>País</li>
                            <li>Terminos y condiciones</li>
                        </ul>
                </div>
                <div className={s.encuestasDIV}>
                    {encuestas.length > 0 ? encuestas?.map(encuesta => (
                            <ul key={encuesta.id}>
                                <li>{encuesta.full_name}</li>
                                <li>{encuesta.email}</li>
                                <li>{encuesta.birth_date}</li>
                                <li>{encuesta.country_of_origin}</li>
                                <li>{encuesta.terms_and_conditions ? 'Aceptado' : 'Rechazado'}</li>
                            </ul>

                    )) : !encuestas ? <h1>Loading...</h1> : <h1>No hay encuestas cargadas en la base de datos, para poder crearlas presiona este botón</h1>}
                </div>
            </div>
        </div>
    )
}

export default Encuestas