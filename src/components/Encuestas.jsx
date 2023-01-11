import React from "react";
import { onGetEncuesta } from "../firebase/firebase-config";
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
                {encuestas.length > 0 ?  encuestas?.map(encuesta => (
                <tr key={encuesta.id}>
                    <td>{encuesta.full_name}</td>
                    <td>{encuesta.email}</td>
                    <td>{encuesta.birth_date.split('/').reverse().join('/')}</td>
                    <td>{encuesta.country_of_origin}</td>
                    <td>{encuesta.terms_and_conditions ? 'Aceptado' : 'Rechazado'}</td>
                </tr>
            )) : !encuestas ? <h1>Loading...</h1> : <h1>No hay encuestas cargadas en la base de datos, para poder crearlas presiona este botón</h1>}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Encuestas