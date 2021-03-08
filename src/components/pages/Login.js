import { Link } from 'react-router-dom';

import Register from './Register';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>

            <form>
                <label htmlFor="username">Benutzername: </label><br/><input type="text" id="username"/><br/>
                <label htmlFor="password">Passwort: </label><br/><input type="password" id="password"/><br/><br/>
                
                <input type="submit" value="Anmelden"/>
            </form>

            <p>
                Neu bei SharedSheets? <Link to="/register">Registrieren</Link>
            </p>
            
        </div>
    )
}

export default Login
