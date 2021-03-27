import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../scripts/auth';

import Register from './Register';

import React from 'react'

const ResponseBox = ({ isValid }) => {
    if (isValid)
    {
        return <p>Anmeldung erfolgreich!</p>;
    } else if (!isValid && isValid !== null) {
        return <p>Anmeldung fehlgeschlagen!</p>;
    } else {
        return '';
    }
}

const Login = () => {
    let history = useHistory();

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
                    console.log('Login!');
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
                <input type="email" id="username" onChange={ handleUsername } /><br/>

                <label htmlFor="password">Passwort: </label><br/>
                <input type="password" id="password" onChange={ handlePassword } /><br/><br/>
                
                <input type="submit" value="Anmelden" />
            </form>

            <p>
                Neu bei SharedSheets? <Link to="/register">Registrieren</Link>
            </p>

            <ResponseBox isValid={ validLogin } />
            
        </div>
    )
}

export default Login
