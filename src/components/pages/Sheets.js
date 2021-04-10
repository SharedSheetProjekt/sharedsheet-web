import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import { useState, useEffect } from 'react';
import MarkdownTest from "./MarkdownTest";
import Sheet from './Sheet';
import Loader from '../structures/Loader';
import { api_load_available_sheets } from "../../scripts/api";

const Sheets = () => {

    let { path, url } = useRouteMatch();

    const [availableSheets, setAvailableSheets] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fakeLoad = () => {
        setTimeout(() => {setLoading(false);}, 2000);
        setLoading(true);
    }

    useEffect(async () => {
        const sheets = await api_load_available_sheets();
        //console.log(sheets);
        setAvailableSheets(sheets);
    }, []);

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h1>Sheets</h1>
                    <ul>
                        {
                            (availableSheets ? availableSheets.map((sheet) => {
                                console.log(sheet);
                                return <li key={sheet.id}><Link to={'/sheets/' + sheet.id} key={sheet.id}>{sheet.title}</Link></li>;
                            }) : null)
                        }
                    </ul>
                    <hr/><br/>
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
