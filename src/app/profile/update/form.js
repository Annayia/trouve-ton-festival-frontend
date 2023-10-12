"use client"
import { exit } from 'process';
import React from 'react'
import { useState, useEffect } from 'react';

export default function Form() {
    const [formSuccess, setFormSuccess] = useState(false)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")
    const [formData, setFormData] = useState({
        lastname: "",
        firstname: "",
        email: "",
        image: ''
    })

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitForm = (e) => {
        // We don't want the page to refresh
        e.preventDefault()

        const formURL = e.target.action
        const data = new FormData()

        // Turn our formData state into data we can use with a form submission
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })

        // POST the data to the URL of the form
        fetch(formURL, {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                // console.log(data.values);
                setFormData({
                    firstname: data.values.firstname,
                    lastname: data.values.lastname,
                    email: data.values.email,
                    image: data.values.image
                })

                setFormSuccess(true)
                setFormSuccessMessage(data.submission_text)
            })
    }
    // console.log(formData);
    return (
        <div>
            {formSuccess ?
                <div style={{ marginLeft: '30%' }}>{formSuccessMessage}</div>
                :
                <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm} style={{ border: 20, margin: 'auto', width: 400, marginTop: 10 }}>
                    <div style={{ display: 'flex' }}>
                        <label style={{ border: 20, width: 200, textAlign: 'left' }}>Nom : </label>
                        <input type='text' name="firstname" value={formData.firstname} onChange={handleInput} placeholder=' Enter your firstname' style={{ width: 200, border: 'solid lightgrey 2px', borderRadius: '5px' }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <label style={{ border: 20, width: 200, textAlign: 'left', marginTop: 10 }}>Prénom : </label>
                        <input type='text' name="lastname" onChange={handleInput} value={formData.lastname} placeholder=' Enter your lastname' style={{ width: 200, border: 'solid lightgrey 2px', borderRadius: '5px', marginTop: 10 }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <label style={{ border: 20, width: 200, textAlign: 'left', marginTop: 10 }}>Email : </label>
                        <input type='text' name="email" value={formData.email} onChange={handleInput} placeholder='Enter your email' style={{ width: 200, border: 'solid lightgrey 2px', borderRadius: '5px', marginTop: 10, marginLeft: 2 }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <label style={{ border: 20, width: 200, textAlign: 'left', marginTop: 10 }}>Image : </label>
                        <input type='image' style={{ border: 20, width: 200, height: 20, marginTop: 10, border: 'solid lightgrey 2px', borderRadius: '5px', textAlign: 'right' }} />
                    </div>
                    <div style={{ marginTop: 20, marginTop: '30px', textAlign: 'center' }}>
                        <button type='submit' style={{ width: 100, padding: 5, marginRight: 30, backgroundColor: 'lightgreen', border: 'solid lightgrey 2px', borderRadius: '5px' }}>Valider</button>
                        <a href={'./../profile'} style={{ textDecoration: 'none', margin: 'auto', padding: '2px 25px', backgroundColor: 'lightblue', border: 'solid lightgrey 2px', borderRadius: '5px' }}>Retour</a>
                    </div>
                </form>
            }
        </div >
    )
}

