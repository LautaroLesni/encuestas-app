export const Validate = (values) => {
    const regexnombre = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i
    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let errors = {}

    if (!values.full_name) {
        errors.full_name = 'Debes escribír tu nombre completo'
    }
    else if (!regexnombre.test(values.full_name)) {
        errors.full_name = 'Tu nombre debe llevar solo letras y un espacio entre el nombre y apellido'
    }
    else if (values.full_name.length > 19) {
        errors.full_name = 'El nombre debe tener un maximo de 20 caracteres'
    }

    if(!values.email){
        errors.email ='Debes introducir un email para continuar'
    }
    else if(!email.test(values.email)){
        errors.email ='Debes introducir un email valido'
    }
    if(values.birth_date === 'ull'){
        errors.birth_date = 'Debes especificar tu fecha de nacimiento valida'
    }
    if(!values.country_of_origin){
        errors.country_of_origin = 'Debes especificar tu país de origen'
    }
    if(!values.terms_and_conditions){
        errors.terms_and_conditions = 'Debes aceptar los terminos y condiciones para enviar la encuesta!'
    }
    return errors
}