import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import MarkdownTest from "./MarkdownTest";
import Sheet from './Sheet';

const Sheets = () => {

    let { path, url } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h1>Sheets</h1>
                    <MarkdownTest />
                </Route>
                <Route exact path={`${path}/:sheetID`}>
                    <Sheet />
                </Route>
            </Switch>
        </div>
    )
}

export default Sheets
