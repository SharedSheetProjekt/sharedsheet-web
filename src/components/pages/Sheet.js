import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api_load_sheet_by_id } from "../../scripts/api";

import Text from "../widgets/Text";
import Image from "../widgets/Image";
import TextInput from "../widgets/TextInput";
import Upload from "../widgets/Upload";
import EditBar from "../structures/EditBar";

const Sheet = () => {
    const [sheet, setSheet] = useState({});
    const [editMode, setEditMode] = useState(false);

    let { sheetID } = useParams();

    useEffect(async () => {
        const sheet = await api_load_sheet_by_id(sheetID);
        setSheet(sheet);
    }, []);

    /*if (sheet === undefined || sheet === null) {
        return null;
    }*/
    //else {
    return (
        <div>
            <table width="100%">
                <tbody>
                <tr>
                    <td>
                        <h1>{sheet.title}</h1>
                        <p style={{ marginTop: '-1.8rem' }}>{sheet.description}</p>
                    </td>
                    <td width="175px" style={{ textAlign: 'right' }}>
                        <button onClick={() => {
                            setEditMode(!editMode);
                        }}>{(editMode ? 'Wechsel zum View-Modus' : 'Wechsel zum Edit-Modus')}</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <pre>Erstellt: {(sheet.created_at ? sheet.created_at.substr(0,10) : '')}   Bearbeitet: {(sheet.updated_at ? sheet.updated_at.substr(0,10) : '')}</pre>
            <hr/>
            {/*<div style={{ color: 'gray', fontStyle: 'italic', overflowX: 'scroll' }}>
                <p><b>DEBUG-INFORMATIONEN</b><br/>ID: {sheetID}</p>
                <pre>{`${JSON.stringify(sheet).replace('{', '{\n  ').replace('}', '\n}').replaceAll(',', ',\n  ')}`}</pre>
            </div>*/}
            {sheet.widgets ? sheet.widgets.map((widget) => {
                const content = JSON.parse(widget.content);
                switch (widget.type) {
                    case 'TextWidget':
                        return <Text widgetID={ widget.id } key={ widget.id } content={ content.content } />;
                        break;
                    case 'ImageWidget':
                        return <Image widgetID={ widget.id } key={ widget.id } src={ content.src } alt={ content.alt } />;
                        break;
                    case 'TextInputWidget':
                        return <TextInput widgetID={ widget.id } key={ widget.id } type={ content.fieldType } placeholder={ content.placeholder } />;
                        break;
                    case 'UploadWidget':
                        return <Upload widgetID={ widget.id } key={ widget.id } hint={ content.hint } fileTypes={ content.fileTypes } maxFileSize={ content.size } />;
                        break;
                    default:
                        return null;
                        break;
                }
            }) : null}
            <EditBar isVisible={ editMode } />   
        </div>
    )//}
}

export default Sheet
