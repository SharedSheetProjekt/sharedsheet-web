import { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { api_delete_widget, api_load_sheet_by_id } from "../../scripts/api";

import Text from "../widgets/Text";
import Image from "../widgets/Image";
import TextInput from "../widgets/TextInput";
import Upload from "../widgets/Upload";
import ResponseInfo from "../structures/ResponseInfo";
import Moment from 'react-moment';
import Loader from "../structures/Loader";
import WidgetView from "../widgets/WidgetView";
import { api_move_widget } from "../../scripts/api";
import EditBar from '../structures/EditBar';

const Sheet = () => {
    const [sheet, setSheet] = useState({});
    const [editMode, setEditMode] = useState(false);

    let {path, url} = useRouteMatch();

    let { sheetID } = useParams();
    let history = useHistory();

    let [loading, setLoading] = useState(true);

    const loadSheet = async () => {
        const sheet = await api_load_sheet_by_id(sheetID);
        if (sheet) setSheet(sheet);
    
        // Loading verstecken
        setLoading(false);
    }

    const rearrangeWidget = async (widget, move) => {   
        await api_move_widget(widget.id, move);
        await loadSheet();
    }
    
    useEffect(async () => {
        await loadSheet();
    }, []);

    const deleteWidget = (widget) => {
        api_delete_widget(widget.id);
        setSheet( {...sheet, widgets: sheet.widgets.filter(w => w.id !== widget.id)} );
    }
    

    if (sheet === undefined || sheet === null) {
        return <ResponseInfo isValid={false} nonValidOutput="Sheet konnte nicht geladen werden oder existiert nicht!" va onlyNonValid={true} />;
    }
    else {
    return (
        <div>
            <Loader isLoading={loading}></Loader>
            <div id="sheet-header">
            <table width="100%">
                <tbody>
                <tr>
                    <td>
                        <h1>{sheet.title}</h1>
                        <p style={{ marginTop: '-1.5rem' }}>{sheet.description}</p>
                    </td>
                    <td width="80px" style={{ textAlign: 'right', display: (sheet?.canEdit ? 'table-cell' : 'none') }}>
                        <button className="icon-desc btn-no-margin" title="Neues Widget hinzufügen" style={{ whiteSpace: 'nowrap' }} onClick={() => {
                            history.push(`/sheets/${sheetID}/new`);
                        }}><span className="material-icons">add_box</span>Neues Widget</button>
                    </td>
                </tr>
                <tr>
                    <td><pre style={{ margin: '0' }}>Erstellt: <Moment date={sheet.created_at} format="DD.MM.YYYY HH:mm" />   Bearbeitet: <Moment date={sheet.updated_at} format="DD.MM.YYYY HH:mm" /></pre></td>
                    <td width="80px" style={{ textAlign: 'right' }}>
                        <button className="icon-desc btn-no-margin" style={{ whiteSpace: 'nowrap' }} onClick={() => {
                            history.push(`/sheets/${sheetID}/solutions`);
                        }} title="Alle Lösungen aller Nutzer anzeigen"
                        ><span className="material-icons">done_all</span>Alle Lösungen</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <hr/>
            {/*<div style={{ color: 'gray', fontStyle: 'italic', overflowX: 'scroll' }}>
                <p><b>DEBUG-INFORMATIONEN</b><br/>ID: {sheetID}</p>
                <pre>{`${JSON.stringify(sheet).replace('{', '{\n  ').replace('}', '\n}').replaceAll(',', ',\n  ')}`}</pre>
            </div>*/}
            {sheet.widgets ? sheet.widgets.map((widget) => {
                return (
                    <div key={widget.id} className="widget">
                        <div className="widget-editbar">
                            <button className="flat-button" style={{marginRight: "10px"}} onClick={() => history.push(`${url}/edit/${widget.id}`)}><span className="material-icons">edit</span></button>
                            <button className="flat-button" style={{marginRight: "10px"}} onClick={() => deleteWidget(widget)}><span className="material-icons">delete</span></button>
                            <button className="flat-button" style={{marginRight: "10px"}} onClick={() => rearrangeWidget(widget, 'up')}><span className="material-icons">arrow_upward</span></button>
                            <button className="flat-button" onClick={() => rearrangeWidget(widget, 'down')}><span className="material-icons">arrow_downward</span></button>
                        </div>

                        <h3>{ widget.title }</h3>
                        <WidgetView widget={widget} loadSheetCb={ loadSheet } />
                    </div>
                )
            }) : null}
            <EditBar deleteWidgetCb={ deleteWidget } updateWidgetsCb={ loadSheet } isVisible={ editMode } />   
        </div>
    )}
}

export default Sheet
