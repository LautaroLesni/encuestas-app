import React from "react";
import db from '../db.json'
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { saveEncuesta } from "../firebase/firebase-config";
import s from './Form.module.css'
import { Validate } from "../functions";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


const inputstyle = { marginTop: '15px', width: '48%' }
const success = {backgroundColor:'#B1F6A9',color:'#206518',width:'96%', padding:'10px'}


const Form = () => {

    const [input, setInput] = useState({
        full_name: '',
        email: '',
        birth_date: null,
        country_of_origin: '',
        terms_and_conditions: false,
    })
    const [errors, setErrors] = useState(Validate(input))
    const [focused, setFocused] = useState({
        full_name: false,
        email: false,
        birth_date: false,
        country_of_origin: false
    })
    const [isCreated, setIsCreated] = useState(false)

    useEffect(() => {

        setErrors(Validate(input))
        
    }, [input, isCreated])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: `${e.target.value}` })
    }
    const handleCheck = (e) => {
        setInput({ ...input, [e.target.name]: e.target.checked })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            setFocused({
                full_name: true,
                email: true,
                birth_date: true,
                country_of_origin: true
            })
            setIsCreated(false)
        }
        else {
            saveEncuesta(input)
            setInput({
                full_name: '',
                email: '',
                birth_date: '',
                country_of_origin: '',
                terms_and_conditions: false,
            })
            setFocused({
                full_name: false,
                email: false,
                birth_date: false,
                country_of_origin: false
            })
            setIsCreated(true)
        }
    }
    
    const handleFocus = (e) => {
        setFocused({ ...focused, [e.target.name]: true })
    }

    return (
        <div className={s.outterDIV}>
            <div className={s.innerDIV}>
                <div className={s.formDIV}>
                    <h2>Encuesta</h2>
                        {isCreated && <Typography style={success} id="modal-modal-description" sx={{ mt: 2 }}>
                            Encuesta enviada!<br/> Para ver los resultados presiona <Link to='/resultados'>aquí</Link></Typography>}

                    {db.items?.map(form => {
                        switch (form.type) {
                            case 'text':
                                return (
                                    <div key={form.label}>
                                        <TextField
                                            error={errors.full_name ? focused.full_name && true : false}
                                            helperText={errors.full_name ? focused.full_name && errors.full_name : ''}
                                            style={inputstyle}
                                            required
                                            id="outlined-required"
                                            label={form.label}
                                            name={form.name}
                                            value={input.full_name}
                                            onChange={handleChange}
                                            onBlur={handleFocus}
                                        />
                                    </div>
                                )
                            case 'email':
                                return (
                                    <div key={form.label}>
                                        <TextField
                                            error={errors.email ? focused.email && true : false}
                                            helperText={errors.email ? focused.email && errors.email : ''}
                                            style={inputstyle}
                                            required={true}
                                            id="outlined-required"
                                            label={form.label}
                                            name={form.name}
                                            value={input.email}
                                            onChange={handleChange}
                                            onBlur={handleFocus}
                                        />
                                    </div>
                                )
                            case 'date':
                                return (
                                    <div key={form.label}>
                                        <Stack spacing={0} />
                                        <FormControl style={inputstyle}>
                                            <DatePicker
                                                label={form.label}
                                                inputFormat="DD/MM/YYYY"
                                                value={input.birth_date}
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(newDate) => { setInput({ ...input, birth_date: newDate ? JSON.stringify(newDate._d).split('T', 1).join().slice(1).split('-').join('/') : '' }) }}
                                                onBlur={handleFocus}
                                            />
                                        <FormHelperText style={{ color: '#D21515' }}>{errors.birth_date ? focused.birth_date && errors.birth_date : ''}</FormHelperText>
                                        </FormControl>
                                    </div>
                                )
                            case 'select':
                                return (
                                    <div key={form.label}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl style={inputstyle}>
                                                <InputLabel id="demo-simple-select-label">{form.label}</InputLabel>
                                                <Select style={{ textAlign: 'left' }}
                                                    error={errors.country_of_origin ? focused.country_of_origin && true : false}
                                                    helperText={errors.country_of_origin ? focused.country_of_origin && errors.country_of_origin : ''}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={input.country_of_origin}
                                                    label={form.label}
                                                    onChange={handleChange}
                                                    name={form.name}
                                                    onBlur={handleFocus}
                                                >
                                                    {form.options?.map(option => (
                                                        <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText style={{ color: '#D21515' }}>{errors.country_of_origin ? focused.country_of_origin && errors.country_of_origin : ''}</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </div>
                                )
                            case 'checkbox':
                                return (
                                    <div key={form.label}>
                                        <h3 className={s.terms_and_conditions}>{form.label}</h3>
                                        <Checkbox
                                            name="terms_and_conditions"
                                            checked={input.terms_and_conditions}
                                            onChange={handleCheck}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </div>
                                )
                            case 'submit':
                                return (
                                    <div key={form.label}>
                                        <Button style={{width:'48%', height:'40px', backgroundColor:'#578797', margin:'10px'}} onClick={handleSubmit} variant="contained" disabled={input.terms_and_conditions ? false : true}>{form.label}</Button>
                                        <h2>{form.name}</h2>
                                    </div>
                                )
                            default:
                                return ''

                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Form