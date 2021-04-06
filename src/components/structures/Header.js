import { Link,  useRouteMatch, useHistory } from 'react-router-dom';
import auth from '../../scripts/auth';

import '../../CSS/Header.css';

const NavLink = ({ label, exactMatch, to }) => {

    let match = useRouteMatch({
        path: to,
        exact: exactMatch
    });

    return (
        <Link to={to} className={ `nav-link ${(match ? 'active-link': '')}` }>{label}</Link>
    )
}

const Header = () => {
    let history = useHistory();

    return (
        <header id="main-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{  }}>
                <ul>
                    <li>
                        {/*<Link to="/" className="nav-link">Home</Link>*/}
                        <NavLink to="/" exactMatch={true} label="Home" />
                    </li>
                    <li>
                        {/*<Link to="/login" className="nav-link">Login</Link>*/}
                        <NavLink to="/login" exactMatch={true} label="Login" />
                    </li>
                    <li>
                        {/*<Link to="/sheets" className="nav-link">Sheets</Link>*/}
                        <NavLink to="/sheets" exactMatch={false} label="Sheets" />
                    </li>
                    <li>
                        {/*<Link to="/account" className="nav-link">Account</Link>*/}
                        <NavLink to="/account" exactMatch={true} label="Account" />
                    </li>
                    <li>
                        {/*<Link to="/about" className="nav-link">About</Link>*/}
                        <NavLink to="/about" exactMatch={true} label="About" />
                    </li>
                </ul>
            </div>
            <div style={{ padding: '18px' }}>
                Benutzername <img src="" alt="ProfilePic"/>
            </div>
            <button onClick={ () => {
                auth.logout(() => {
                    console.log('Logout!');
                    history.push('/');
                });
            } }>Logout</button>
        </header>
    )
}

export default Header
