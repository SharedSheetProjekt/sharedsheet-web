import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import { useState } from 'react';
import MarkdownTest from "./MarkdownTest";
import Sheet from './Sheet';
import Loader from '../structures/Loader';

const Sheets = () => {

    let { path, url } = useRouteMatch();

    const [loading, setLoading] = useState(false);
    
    const fakeLoad = () => {
        setTimeout(() => {setLoading(false);}, 2000);
        setLoading(true);
    }

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h1>Sheets</h1>
                    <MarkdownTest />
                    <button onClick={ fakeLoad }>Load</button>
                    <Loader isLoading={ loading } />
                </Route>
                <Route exact path={`${path}/:sheetID`}>
                    <Sheet />
                </Route>
            </Switch>
        </div>
    )
}

export default Sheets
