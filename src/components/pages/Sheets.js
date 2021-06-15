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
import SolutionViewer from "./SolutionViewer";
import Moment from "react-moment";

const Sheets = () => {

    let { path, url } = useRouteMatch();
    let history = useHistory();

    const [availableSheets, setAvailableSheets] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteSheet = async (sheetId) => {
        if (await api_delete_sheet(sheetId))
        {
            setAvailableSheets( availableSheets.filter(sheet => sheet.id !== sheetId) );
        }
    }
    
    const loadSheets = async () => {
        const sheets = await api_load_available_sheets();

        // Loading-Indicator entfernen
        setLoading(false);

        //console.log(sheets);
        setAvailableSheets(sheets);
    }
    
    const fakeLoad = () => {
        setTimeout(() => {setLoading(false);}, 2000);
        setLoading(true);
    }

    useEffect(async () => {
        await loadSheets();
    }, []);

    return (
        <div>
            <Loader isLoading={loading}></Loader>

            <Switch>
                <Route exact path={path}>
                    <h1>Meine Sheets</h1>
                    <button className="icon-desc fullbutton" onClick={() => {
                        history.push('/sheets/new');
                    }}>
                        <span className="material-icons">note_add</span>Neues Sheet erstellen
                    </button>

                    <table className="item-list">
                        <thead>
                            <tr>
                                <th className="left">Name</th>
                                <th>Autor</th>
                                <th>Fälligkeitsdatum</th>
                                <th>Aktion</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                (availableSheets ? availableSheets.map((sheet) => {
                                    // Return the sheet as row, which will redirect the user to the sheet-view:
                                    return <tr key={sheet.id}>
                                            <td onClick={() => history.push('/sheets/' + sheet.id)}>{ sheet.title }</td>
                                            <td onClick={() => history.push('/sheets/' + sheet.id)} className="center">{ sheet.author }</td>
                                            <td onClick={() => history.push('/sheets/' + sheet.id)} className="center"><Moment date={sheet.due} format="DD.MM.YYYY HH:mm" /></td>
                                            <td className="center"><button className="btn-no-margin icon-desc" onClick={() => {deleteSheet(sheet.id)} }><span className="material-icons">delete</span> Löschen</button></td>
                                        </tr>
                                }) : null)
                            }
                        </tbody>
                    </table>

                    {/*<ul>
                        {
                            (availableSheets ? availableSheets.map((sheet) => {
                                return <li key={sheet.id} style={{ margin: '1rem 0' }}>
                                            <Link to={'/sheets/' + sheet.id} key={sheet.id}>{sheet.title}</Link>
                                            <button onClick={ () => {deleteSheet(sheet.id)} } style={{ marginLeft: '1rem', display: (sheet?.canEdit ? 'inline-flex' : 'none') }}><span className="material-icons">delete</span></button>
                                        </li>;
                            }) : null)
                        }
                    </ul>
                    
                    {/*<hr/><br/>
                    <MarkdownTest />
                    <button onClick={ fakeLoad }>Load</button>
                    <Loader isLoading={ loading } />*/}
                </Route>
                <Route exact path={`${path}/new`}>
                    <SheetCreator loadSheetsCb={ loadSheets } />
                </Route>
                <Route exact path={`${path}/:sheetID/edit/:widgetID`}>
                    <WidgetEditor />
                </Route>
                <Route exact path={`${path}/:sheetID/new`}>
                    <WidgetCreator />
                </Route>
                <Route exact path={`${path}/:sheetID/solutions`}>
                    <SolutionViewer />
                </Route>
                <Route exact path={`${path}/:sheetID`}>
                    <Sheet />
                </Route>
            </Switch>
        </div>
    )
}

export default Sheets
