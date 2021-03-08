import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import Sheet from './Sheet';

const Sheets = () => {

    let { path, url } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h1>Sheets</h1>
                </Route>
                <Route exact path={`${path}/:sheetID`}>
                    <Sheet />
                </Route>
            </Switch>
        </div>
    )
}

export default Sheets
