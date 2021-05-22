import { useState } from 'react';
import { useHistory } from 'react-router';
import { api_create_new_sheet } from '../../scripts/api';

import ResponseInfo from '../structures/ResponseInfo';

const SheetCreator = () => {
    let history = useHistory();

    const [validCreation, setValidCreation] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submission, setSubmission] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title !== '' && description !== '' && submission !== '') {
            const sheetId = await api_create_new_sheet(title, description, submission);

            if (sheetId) {
                history.push(`/sheets/${sheetId}`);
                setValidCreation(true);
            }
            else
            {
                setValidCreation(false);
            }
        }

    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmission = (e) => {
        setSubmission(e.target.value);
    }
    

    return (
        <div>
            <h1>Neues Sheet erstellen</h1>

            <button onClick={() => {
                history.push('/sheets');
            }}><span className="material-icons">arrow_back_ios</span> Zurück zur Übersicht</button>

            <form onSubmit={ handleSubmit }>
                <p>Titel:</p>
                <input type="text" name="title" style={{ width: '100%' }} onChange={ handleTitle } required /><br/>
                <p>Beschreibung:</p>
                <textarea name="description" rows="4" style={{ width: '100%' }} onChange={ handleDescription } required></textarea><br/>
                <p>Abgabe bis:</p>
                <input type="datetime-local" name="submission" onChange={ handleSubmission } required /><br/><br/>

                <input type="submit" value="Sheet erstellen"/>
            </form>

            <br/>

            <ResponseInfo isValid={ validCreation } validOutput="Sheet-Erstellung erfolgreich!" nonValidOutput="Sheet-Erstellung fehlgeschlagen!" onlyNonValid={ false } />
        </div>
    )
}

export default SheetCreator
