import { Link, useHistory, useLocation } from 'react-router-dom';
import auth from '../../scripts/auth';

import Register from './Register';

const Login = () => {
    let history = useHistory();

    return (
        <button onClick={
            () => {
                auth.login(() => {
                    console.log("Login!");
                    history.push("/sheets");
                });
            }
        }>
            Login
        </button>
    );

    /*return (
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
    )*/
}

export default Login
