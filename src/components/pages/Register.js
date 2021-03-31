import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../scripts/auth';

import ResponseInfo from '../structures/ResponseInfo';
import '../../CSS/input.css';

const Register = () => {
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const [validUsername, setValidUsername] = useState(null);
    const [validEMail, setValidEMail] = useState(null);
    const [validPassword, setValidPassword] = useState(null);
    const [validRepeatedPassword, setValidRepeatedPassword] = useState(null);

    const [validLogin, setValidLogin] = useState(null);

    const handleUsername = (e) => {
        if (e.target.value !== '') {e.target.classList.remove('invalid'); setValidUsername(true)};
        setUsername(e.target.value);
    }

    const handleEMail = (e) => {
        if (e.target.value !== '') {e.target.classList.remove('invalid'); setValidEMail(true);};
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        if (e.target.value.length >= 8) {e.target.classList.remove('invalid'); setValidPassword(true)};
        setPassword(e.target.value);
    }

    const handlePasswordRepeat = (e) => {
        e.target.classList.remove('invalid');
        setRepeatedPassword(e.target.value);
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === '') {
            document.getElementById('username').classList.add('invalid');
            setValidUsername(false);
        }
        if (email === '') {
            document.getElementById('email').classList.add('invalid');
            setValidEMail(false);
        }
        if (password.length < 8) {
            document.getElementById('password').classList.add('invalid');
            setValidPassword(false);
        }
        if (repeatedPassword !== password) {
            document.getElementById('repeatpassword').classList.add('invalid');
            setValidRepeatedPassword(false);
        }
        else {
            document.getElementById('repeatpassword').classList.remove('invalid');
            setValidRepeatedPassword(true);
        }

        if (username !== '' && email !== '' && password !== '' && repeatedPassword !== '' && password.length >= 8 && password === repeatedPassword) {
            auth.register(null, username, password, email);
            if (
                await auth.register(() => {
                    console.log('Registered!');
                    history.push('/sheets');
                },
                username,
                password,
                email
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
            <h1>Register</h1>

            <form onSubmit={ handleSubmit }>
                <label htmlFor="username">Benutzername: </label><br/><input type="text" id="username" onInput={ handleUsername } /><br/>
                <label htmlFor="email">EMail-Adresse: </label><br/><input type="email" id="email" onInput={ handleEMail } /><br/>
                <label htmlFor="password">Password: </label><br/><input type="password" id="password" onInput={ handlePassword } placeholder="mind. 8 Zeichen" /><br/>
                <label htmlFor="repeatpassword">Passwort wiederholen: </label><br/><input type="password" id="repeatpassword" onInput={ handlePasswordRepeat } /><br/><br/>
                
                <input type="submit" value="Registrieren"/>
            </form>

            <p>
                Sie besitzen bereits ein Konto? <Link to="/login">Login</Link>
            </p>

            <ResponseInfo isValid={ validUsername } nonValidOuput="Fehlender Benutzername!" onlyNonValid={ true } />
            <ResponseInfo isValid={ validEMail } nonValidOuput="Fehlende EMail-Adresse!" onlyNonValid={ true } />
            <ResponseInfo isValid={ validPassword } nonValidOuput="Passwort muss mind. 8 Zeichen lang sein!" onlyNonValid={ true } />
            <ResponseInfo isValid={ validRepeatedPassword } nonValidOuput="Wiederholtes Passwort stimmt mit Passwort nicht überein!" onlyNonValid={ true } />

            <ResponseInfo isValid={ validLogin } validOuput="Registrierung erfolgreich!" nonValidOuput="Registrierung fehlgeschlagen!" onlyNonValid={ false } />
        </div>
    )
}

export default Register
