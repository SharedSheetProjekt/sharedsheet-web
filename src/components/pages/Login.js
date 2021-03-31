import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../scripts/auth';

import ResponseInfo from '../structures/ResponseInfo';
import Loader from '../structures/Loader';

import '../../CSS/input.css';

import React from 'react'

const Login = () => {
    let history = useHistory();

    const [isLoading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validLogin, setValidLogin] = useState(null);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(username !== '' && password !== '') {
            if (
                await auth.login(() => {
                    console.log('Logged in!');
                    history.push('/sheets');
                },
                username,
                password
                )
            ) {
                setValidLogin(true);
            } else {
                setValidLogin(false);
            }
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={ handleSubmit }>
                <label htmlFor="username">EMail: </label><br/>
                <input type="email" id="username" onChange={ handleUsername } required /><br/>

                <label htmlFor="password">Passwort: </label><br/>
                <input type="password" id="password" onChange={ handlePassword } required /><br/><br/>
                
                <input type="submit" value="Anmelden" />
            </form>

            <p>
                Neu bei SharedSheets? <Link to="/register">Registrieren</Link>
            </p>

            <ResponseInfo isValid={ validLogin } validOuput="Anmeldung erfolgreich!" nonValidOuput="Anmeldung fehlgeschlagen!" onlyNonValid={ false } />
            
            <Loader isLoading={ isLoading } />
        </div>
    )
}

export default Login
