import { QuerySnapshot } from "firebase/firestore";
import React from "react";
import { getEncuesta, onGetEncuesta } from "../firebase/firebase-config";
import { useState, useEffect } from "react";


const Encuestas = () =>{
const [encuestas, setEncuestas] = useState(false)

useEffect(()=>{
    onGetEncuesta((querySnapshot)=>{
        const array = []

        querySnapshot.forEach((doc)=>{
            let encuesta = doc.data()
            encuesta.id = doc.id
            array.push(encuesta)
            console.log(encuesta)
        })
        setEncuestas(array)

    })
},[])

    return (
        <div>
            {encuestas.length > 0 ?  encuestas?.map(encuesta => (
                <div key={encuesta.id}>
                    <h1>{encuesta.full_name}</h1>
                    <h1>{encuesta.email}</h1>
                    <h1>{encuesta.birth_date}</h1>
                    <h1>{encuesta.country_of_origin}</h1>
                    <h1>{encuesta.terms_and_conditions}</h1>
                </div>
            )) : !encuestas ? <h1>Loading...</h1> : <h1>No hay encuestas cargadas en la base de datos, para poder crearlas presiona este botón</h1>}
        </div>
    )
}

export default Encuestas