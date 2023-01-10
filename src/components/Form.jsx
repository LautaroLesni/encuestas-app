import React from "react";
import db from '../db.json'
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { saveEncuesta } from "../firebase/firebase-config";
import s from './Form.module.css'


const inputstyle = { marginTop: '15px', width: '48%' }


const Form = () => {

    const [input, setInput] = useState({
        full_name: '',
        email: '',
        birth_date: '',
        country_of_origin: '',
        terms_and_conditions: false,
    })

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: `${e.target.value}` })
    }
    const handleCheck = (e) => {
        setInput({ ...input, [e.target.name]: e.target.checked })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        saveEncuesta(input)
        setInput({
            full_name: '',
            email: '',
            birth_date: '',
            country_of_origin: '',
            terms_and_conditions: false,
        })
    }

    return (
        <div className={s.outterDIV}>
            <div className={s.innerDIV}>
                <div className={s.formDIV}>
                    <h2>Encuesta</h2>
                    {db.items?.map(form => {
                        switch (form.type) {
                            case 'text':
                                return (
                                    <div key={form.label}>
                                        <TextField
                                            error={true}
                                            helperText={'Requerido'}
                                            style={inputstyle}
                                            required
                                            id="outlined-required"
                                            label={form.label}
                                            name={form.name}
                                            value={input.full_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )
                            case 'email':
                                return (
                                    <div key={form.label}>
                                        <TextField
                                            style={inputstyle}
                                            required
                                            id="outlined-required"
                                            label={form.label}
                                            name={form.name}
                                            value={input.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )
                            case 'date':
                                return (
                                    <div key={form.label}>
                                        <Stack spacing={0} />
                                        <FormControl style={inputstyle}>
                                            <DesktopDatePicker
                                                helperText={'Requerido'}
                                                label={form.label}
                                                inputFormat="DD/MM/YYYY"
                                                value={input.birth_date}
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(newDate) => { setInput({ ...input, birth_date: newDate ? JSON.stringify(newDate._d).split('T', 1).join().slice(1).split('-').join('/') : '' }) }}
                                            />
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
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={input.country_of_origin}
                                                    label={form.label}
                                                    onChange={handleChange}
                                                    name={form.name}
                                                >
                                                    {form.options?.map(option => (
                                                        <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                )
                            case 'checkbox':
                                return (
                                    <div key={form.label}>
                                        <h3>{form.label}</h3>
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
                                        <Button onClick={handleSubmit} variant="contained" disabled={input.terms_and_conditions ? false : true}>{form.label}</Button>
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