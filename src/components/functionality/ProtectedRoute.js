import { Route, Redirect } from 'react-router-dom';
import auth from '../../scripts/auth';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (auth.isAuthenticated()) {
                    console.log('Authorized!');
                    return <Component {...props} />;
                } else {
                    console.log('Not authorized!');
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />;
                }
            }
        } />
    )
}
