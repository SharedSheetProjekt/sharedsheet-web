import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../scripts/auth';

import ResponseInfo from '../structures/ResponseInfo';
import Loader from '../structures/Loader';
import '../../CSS/input.css';

const Register = () => {
    let history = useHistory();

    const [isLoading, setLoading] = useState(false);

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
            <h1 className="rainbow">SharedSheets</h1>
            <hr />
            <h2>Registrierung</h2>

            <form onSubmit={ handleSubmit }>
                <label htmlFor="username">Benutzername: </label><br/><input type="text" id="username" onInput={ handleUsername } /><br/>
                <label htmlFor="email">EMail-Adresse: </label><br/><input type="email" id="email" onInput={ handleEMail } /><br/>
                <label htmlFor="password">Password: </label><br/><input type="password" id="password" onInput={ handlePassword } placeholder="mind. 8 Zeichen" /><br/>
                <label htmlFor="repeatpassword">Passwort wiederholen: </label><br/><input type="password" id="repeatpassword" onInput={ handlePasswordRepeat } /><br/><br/>
                
                <button type="submit" className="icon-desc fullbutton"><span className="material-icons">login</span> Registrieren</button>
            </form>

            <p>
                Sie besitzen bereits ein Konto? <Link className="alias-pointer" to="/">Anmelden</Link>
            </p>

            <ResponseInfo isValid={ validUsername } nonValidOutput="Fehlender Benutzername!" onlyNonValid={ true } />
            <ResponseInfo isValid={ validEMail } nonValidOutput="Fehlende EMail-Adresse!" onlyNonValid={ true } />
            <ResponseInfo isValid={ validPassword } nonValidOutput="Passwort muss mind. 8 Zeichen lang sein!" onlyNonValid={ true } />
            <ResponseInfo isValid={ validRepeatedPassword } nonValidOutput="Wiederholtes Passwort stimmt mit Passwort nicht überein!" onlyNonValid={ true } />

            <ResponseInfo isValid={ validLogin } validOutput="Registrierung erfolgreich!" nonValidOutput="Registrierung fehlgeschlagen!" onlyNonValid={ false } />

            <Loader isLoading={ isLoading } />
        </div>
    )
}

export default Register
