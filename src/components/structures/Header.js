import { Link,  useRouteMatch } from 'react-router-dom';

import '../../CSS/Header.css';

const NavLink = ({ label, exactMatch, to }) => {

    let match = useRouteMatch({
        path: to,
        exact: exactMatch
    });

    return (
        <Link to={to} className={ `nav-link ${(match ? "active-link": "")}` }>{label}</Link>
    )
}

const Header = () => {
    return (
        <header id="main-header">
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
        </header>
    )
}

export default Header
