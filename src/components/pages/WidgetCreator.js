import { useHistory, useParams } from "react-router";
import { useState } from 'react';
import { api_create_new_widget } from "../../scripts/api";
import ResponseInfo from '../structures/ResponseInfo';

const WidgetCreator = () => {
    let { sheetID } = useParams();
    let history = useHistory();

    const [type, setType] = useState('TextWidget');
    const [validCreation, setValidCreation] = useState(null);

    const renderSpecificWidgetCreator = (widgetType) => {
        switch (widgetType) {
            case 'TextWidget':
                return (<>
                    <label htmlFor="content">Inhalt</label><br/>
                    <textarea name="content" id="content" rows="10" style={{ width: '100%', resize: 'vertical' }} required></textarea>
                </>);
            
            case 'ImageWidget':
                return (<>
                    <label htmlFor="src">Bild-URL</label><br/>
                    <input type="text" name="src" id="src" style={{ width: '100%' }} required/>
                    <br/><br/>
                    <label htmlFor="alt">Alternativtext</label><br/>
                    <input type="text" name="alt" id="alt" style={{ width: '100%' }} required/>
                </>);

            case 'TextInputWidget':
                return (<>
                    <label htmlFor="placeholder">Platzhalter</label><br/>
                    <input type="text" name="placeholder" id="placeholder" style={{ width: '100%' }} required/>
                    <br/><br/>
                    <label htmlFor="fieldType">Eingabe-Typ</label><br/>
                    <select name="fieldType" id="fieldType" required>
                        <option value="text">Text</option>
                        <option value="number">Zahl</option>
                    </select>
                </>);

            case 'UploadWidget':
                return (<>
                    <label htmlFor="hint">Beschreibung</label><br/>
                    <input type="text" name="hint" id="hint" style={{ width: '100%' }} required/>
                    <br/><br/>
                    <label htmlFor="size">Maximale Dateigröße</label><br/>
                    <input type="number" min="1" name="size" id="size" style={{ width: '50px', textAlign: 'right' }} required/> MB
                    <br/><br/>
                    <details>
                        <summary>Erlaubte Dateiformate</summary>
                        <input type="checkbox" name="format" value="any"/><label>.*</label><br/>
                        <input type="checkbox" name="format" value="txt"/><label>.txt</label><br/>
                        <input type="checkbox" name="format" value="pdf"/><label>.pdf</label><br/>
                        <input type="checkbox" name="format" value="docx"/><label>.docx</label><br/>
                        <input type="checkbox" name="format" value="pptx"/><label>.pptx</label><br />
                        <input type="checkbox" name="format" value="xlsx"/><label>.xlsx</label><br/>
                        <input type="checkbox" name="format" value="png/jpg/jpeg"/><label>.png / .jpg / .jpeg</label>
                    </details>
                </>);
        
            default:
                return null;
        }
    }

    const collectInputValues = () => {
        const title = document.getElementById('title').value;
        let widgetObj = {};

        if (title) {
            switch (type) {
                case 'TextWidget':
                    const content = document.getElementById('content').value;
                    if (content) {widgetObj = {content: JSON.stringify({content: content})};}
                    break;
                case 'ImageWidget':
                    const src = document.getElementById('src').value;
                    const alt = document.getElementById('alt').value;
                    if (src && alt) {widgetObj = {content: JSON.stringify({src: src, alt: alt})};}
                    break;
                case 'TextInputWidget':
                    const placeholder = document.getElementById('placeholder').value;
                    const fieldType = document.getElementById('fieldType').value;
                    if (placeholder && fieldType) {widgetObj = {content: JSON.stringify({placeholder: placeholder, fieldType: fieldType})};}
                    break;
                case 'UploadWidget':
                    const hint = document.getElementById('hint').value;
                    const fileTypes = [];
                    let checkedFileTypeBoxes = document.querySelectorAll('input[type="checkbox"][name="format"]:checked');
                    for (const checkbox of checkedFileTypeBoxes) {
                        switch (checkbox.value) {
                            case 'any':
                                fileTypes.push('*');
                                break;
                            case 'txt':
                                fileTypes.push('.txt');
                                break;
                            case 'pdf':
                                fileTypes.push('.pdf');
                                break;
                            case 'docx':
                                fileTypes.push('.docx');
                                break;
                            case 'pptx':
                                fileTypes.push('.pptx');
                                break;
                            case 'xlsx':
                                fileTypes.push('.xlsx');
                                break;
                            case 'png/jpg/jpeg':
                                fileTypes.push('.png', '.jpg', '.jpeg');
                                break;
                        
                            default:
                                break;
                        }
                    }

                    const fileTypesString = fileTypes.join();
                    
                    if (hint && fileTypes) {widgetObj = {content: JSON.stringify({hint: hint, filetypes: fileTypesString})};}
                    break;
                default:
                    return null;
            }

            widgetObj = {title: title, ...widgetObj};

            return widgetObj;
        } else {
            return null;
        }
    }

    const handleWidgetCreationSubmit = async (e) => {
        e.preventDefault();

        let widget = collectInputValues();
        if (widget) {
            widget = {type: type, ...widget};

            if (await api_create_new_widget(sheetID, widget)) {
                history.push(`/sheets/${sheetID}`);
                setValidCreation(true);
            }
            else
            {
                setValidCreation(false);
            }
        }
    }
    
    

    return (
        <div>
            <h1>Neues Widget erstellen</h1>

            <button onClick={() => {
                history.push(`/sheets/${sheetID}`);
            }}><span className="material-icons">arrow_back_ios</span> Zurück zum Sheet</button>

            <br/><br/>

            <form>
                <label htmlFor="widget-type">Widget-Typ: </label>
                <select name="widget-type" onChange={(e) => {setType(e.target.value)}}>
                    <option value="TextWidget">Text</option>
                    <option value="ImageWidget">Bild</option>
                    <option value="TextInputWidget">Texteingabe</option>
                    <option value="UploadWidget">Upload</option>
                </select>
            </form>

            <br/><hr/><br/>
            
            <form onSubmit={ handleWidgetCreationSubmit }>
                <label htmlFor="title">Titel</label><br/>
                <input type="text" name="title" id="title" required/>
                <br/><br/>
                { renderSpecificWidgetCreator(type) }
                <br/><br/>
                <input type="submit" value="Widget erstellen"/>
            </form>

            <br/>
            <ResponseInfo isValid={ validCreation } validOutput="Widget-Erstellung erfolgreich!" nonValidOutput="Widget-Erstellung fehlgeschlagen!" onlyNonValid={ false } />

        </div>
    )
}

export default WidgetCreator
