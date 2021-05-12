import { useHistory, useParams } from "react-router";
import { useState } from 'react';

const WidgetCreator = () => {
    let { sheetID } = useParams();
    let history = useHistory();

    const [type, setType] = useState('text');

    const renderSpecificWidgetCreator = (widgetType) => {
        switch (widgetType) {
            case 'text':
                return (<>
                    <label htmlFor="content">Inhalt</label><br/>
                    <textarea name="content" rows="10" style={{ width: '100%', resize: 'vertical' }} required></textarea>
                </>);
            
            case 'image':
                return (<>
                    <label htmlFor="src">Bild-URL</label><br/>
                    <input type="text" name="src" style={{ width: '100%' }} required/>
                    <br/><br/>
                    <label htmlFor="alt">Alternativtext</label><br/>
                    <input type="text" name="alt" style={{ width: '100%' }} required/>
                </>);

            case 'textinput':
                return (<>
                    <label htmlFor="placeholder">Platzhalter</label><br/>
                    <input type="text" name="placeholder" style={{ width: '100%' }} required/>
                    <br/><br/>
                    <label htmlFor="fieldType">Eingabe-Typ</label><br/>
                    <select name="fieldType" required>
                        <option value="text">Text</option>
                        <option value="number">Zahl</option>
                    </select>
                </>);

            case 'upload':
                return (<>
                    <label htmlFor="hint">Beschreibung</label><br/>
                    <input type="text" name="hint" style={{ width: '100%' }} required/>
                    <br/><br/>
                    <label htmlFor="size">Maximale Dateigröße</label><br/>
                    <input type="number" min="1" name="size" style={{ width: '50px', textAlign: 'right' }} required/> MB
                    <br/><br/>
                    <details>
                        <summary>Erlaubte Dateiformate</summary>
                        <input type="checkbox" name="format" value="pdf"/><label>.pdf</label><br/>
                        <input type="checkbox" name="format" value="docx"/><label>.docx</label><br/>
                        <input type="checkbox" name="format" value="png"/><label>.png</label>
                    </details>
                </>);
        
            default:
                return null;
        }
    }

    const handleWidgetCreationSubmit = async (e) => {
        e.preventDefault();
    }
    
    

    return (
        <div>
            <h1>Neues Widget erstellen</h1>

            <button onClick={() => {
                history.push(`/sheets/${sheetID}`);
            }}>Zurück zum Sheet</button>

            <br/><br/>

            <form>
                <label htmlFor="widget-type">Widget-Typ: </label>
                <select name="widget-type" onChange={(e) => {setType(e.target.value)}}>
                    <option value="text">Text</option>
                    <option value="image">Bild</option>
                    <option value="textinput">Texteingabe</option>
                    <option value="upload">Upload</option>
                </select>
            </form>

            <br/><hr/><br/>
            
            <form onSubmit={ handleWidgetCreationSubmit }>
                <label htmlFor="title">Titel</label><br/>
                <input type="text" name="title" required/>
                <br/><br/>
                { renderSpecificWidgetCreator(type) }
                <br/><br/>
                <input type="submit" value="Widget erstellen"/>
            </form>
        </div>
    )
}

export default WidgetCreator
