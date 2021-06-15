import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { api_load_widget_by_id, api_update_widget } from '../../scripts/api';
import ResponseInfo from '../structures/ResponseInfo';
import Loader from '../structures/Loader';

const WidgetEditor = () => {
    let { sheetID, widgetID } = useParams();
    let history = useHistory();

    const [widget, setWidget] = useState(null);
    const [validCreation, setValidCreation] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        // TODO: API call for widget by ID
        setWidget(await api_load_widget_by_id(widgetID));

        setLoading(false);
    }, []);

    const renderSpecificWidgetEditor = (widgetType, widgetContent) => {
        if (widgetType && widgetContent) {
            widgetContent = JSON.parse(widgetContent);
            switch (widgetType) {
                case 'TextWidget':
                    return (<>
                        <label htmlFor="content">Inhalt</label><br/>
                        <textarea name="content" id="content" rows="10" style={{ width: '100%', resize: 'vertical' }} defaultValue={widgetContent.content} required></textarea>
                    </>);
                
                case 'ImageWidget':
                    return (<>
                        <label htmlFor="src">Bild-URL</label><br/>
                        <input type="text" name="src" id="src" style={{ width: '100%' }} defaultValue={widgetContent.src} required/>
                        <br/><br/>
                        <label htmlFor="alt">Alternativtext</label><br/>
                        <input type="text" name="alt" id="alt" style={{ width: '100%' }} defaultValue={widgetContent.alt} required/>
                    </>);

                case 'TextInputWidget':
                    return (<>
                        <label htmlFor="placeholder">Platzhalter</label><br/>
                        <input type="text" name="placeholder" id="placeholder" style={{ width: '100%' }} defaultValue={widgetContent.placeholder} required/>
                        <br/><br/>
                        <label htmlFor="fieldType">Eingabe-Typ</label><br/>
                        <select name="fieldType" id="fieldType" defaultValue={widgetContent.fieldType} required>
                            <option value="text">Text</option>
                            <option value="number">Zahl</option>
                        </select>
                    </>);

                case 'UploadWidget':
                    console.log(widgetContent)
                    return (<>
                        <label htmlFor="hint">Beschreibung</label><br/>
                        <input type="text" name="hint" id="hint" style={{ width: '100%' }} defaultValue={widgetContent.hint} required/>
                        <br/><br/>
                        <label htmlFor="size">Maximale Dateigröße</label><br/>
                        <input type="number" min="1" name="size" id="size" style={{ width: '50px', textAlign: 'right' }} defaultValue={widgetContent?.size} required/> MB
                        <br/><br/>
                        <details>
                            <summary>Erlaubte Dateiformate</summary>
                            <input type="checkbox" name="format" value="any" defaultChecked={widgetContent.filetypes.includes('*') ? true : false}/><label>.*</label><br/>
                            <input type="checkbox" name="format" value="txt" defaultChecked={widgetContent.filetypes.includes('.txt') ? true : false}/><label>.txt</label><br/>
                            <input type="checkbox" name="format" value="pdf" defaultChecked={widgetContent.filetypes.includes('.pdf') ? true : false}/><label>.pdf</label><br/>
                            <input type="checkbox" name="format" value="docx" defaultChecked={widgetContent.filetypes.includes('.docx') ? true : false}/><label>.docx</label><br/>
                            <input type="checkbox" name="format" value="pptx" defaultChecked={widgetContent.filetypes.includes('.pptx') ? true : false}/><label>.pptx</label><br />
                            <input type="checkbox" name="format" value="xlsx" defaultChecked={widgetContent.filetypes.includes('.xlsx') ? true : false}/><label>.xlsx</label><br/>
                            <input type="checkbox" name="format" value="png/jpg/jpeg" defaultChecked={widgetContent.filetypes.includes('.png,.jpg,.jpeg') ? true : false}/><label>.png / .jpg / .jpeg</label>
                        </details>
                    </>);
            
                default:
                    return null;
            }
        } else {
            return null;
        }
    }

    const collectInputValues = () => {
        const title = document.getElementById('title').value;
        let widgetObj = {};

        if (title) {
            switch (widget?.type) {
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
                    const maxFileSize = document.getElementById('size').value;
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
                    
                    if (hint && maxFileSize && maxFileSize > 0 && fileTypes) {widgetObj = {content: JSON.stringify({hint: hint, filetypes: fileTypesString, size: maxFileSize})};}
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

    const handleWidgetEditSubmit = async (e) => {
        e.preventDefault();

        let editedWidget = collectInputValues();
        if (editedWidget) {
            editedWidget = {type: widget.type, ...editedWidget};

            if (await api_update_widget(widgetID, editedWidget)) {
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
            <Loader isLoading={loading}></Loader>

            <h1>Widget editieren</h1>
            <button onClick={() => {
                history.push(`/sheets/${sheetID}`);
            }}><span className="material-icons">arrow_left</span> Zurück zum Sheet</button>

            <br/><br/>

            

            <form onSubmit={ handleWidgetEditSubmit }>
                <label htmlFor="title">Titel</label><br/>
                <input type="text" name="title" id="title" defaultValue={widget?.title} required/>
                <br/><br/>
                { renderSpecificWidgetEditor(widget?.type, widget?.content) }
                <br/><br/>
                <input type="submit" value="Widget editieren"/>
            </form>

            <br/>
            <ResponseInfo isValid={ validCreation } validOutput="Widget-Bearbeitung erfolgreich!" nonValidOutput="Widget-Bearbeitung fehlgeschlagen!" onlyNonValid={ false } />
        </div>
    )
}

export default WidgetEditor
