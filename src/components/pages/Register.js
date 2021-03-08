import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>

            <form>
                <label htmlFor="username">Benutzername: </label><br/><input type="text" id="username"/><br/>
                <label htmlFor="email">EMail-Adresse: </label><br/><input type="email" id="email"/><br/>
                <label htmlFor="password">Password: </label><br/><input type="password" id="password"/><br/>
                <label htmlFor="repeatpassword">Passwort wiederholen: </label><br/><input type="password" id="repeatpassword"/><br/><br/>
                
                <input type="submit" value="Registrieren"/>
            </form>

            <p>
                Sie besitzen bereits ein Konto? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Register
