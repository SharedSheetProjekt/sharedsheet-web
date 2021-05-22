import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory
  } from "react-router-dom";
import { useState, useEffect } from 'react';
import MarkdownTest from "./MarkdownTest";
import Sheet from './Sheet';
import SheetCreator from './SheetCreator'
import Loader from '../structures/Loader';
import { api_load_available_sheets, api_delete_sheet } from "../../scripts/api";
import WidgetCreator from "./WidgetCreator";
import WidgetEditor from "./WidgetEditor";

const Sheets = () => {

    let { path, url } = useRouteMatch();
    let history = useHistory();

    const [availableSheets, setAvailableSheets] = useState([]);
    const [loading, setLoading] = useState(false);

    const deleteSheet = async (sheetId) => {
        if (await api_delete_sheet(sheetId))
        {
            setAvailableSheets( availableSheets.filter(sheet => sheet.id !== sheetId) );
        }
    }
    
    
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
                    <button className="icon-desc" onClick={() => {
                        history.push('/sheets/new');
                    }}><span className="material-icons">note_add</span>Neues Sheet erstellen</button>
                    <ul>
                        {
                            (availableSheets ? availableSheets.map((sheet) => {
                                return <li key={sheet.id} style={{ margin: '1rem 0' }}>
                                            <Link to={'/sheets/' + sheet.id} key={sheet.id}>{sheet.title}</Link>
                                            <button onClick={ () => {deleteSheet(sheet.id)} } style={{ marginLeft: '1rem' }}><span className="material-icons">delete</span></button>
                                        </li>;
                            }) : null)
                        }
                    </ul>
                    <hr/><br/>
                    <MarkdownTest />
                    <button onClick={ fakeLoad }>Load</button>
                    <Loader isLoading={ loading } />
                </Route>
                <Route exact path={`${path}/new`}>
                    <SheetCreator />
                </Route>
                <Route exact path={`${path}/:sheetID/edit/:widgetID`}>
                    <WidgetEditor />
                </Route>
                <Route exact path={`${path}/:sheetID/new`}>
                    <WidgetCreator />
                </Route>
                <Route exact path={`${path}/:sheetID`}>
                    <Sheet />
                </Route>
            </Switch>
        </div>
    )
}

export default Sheets
