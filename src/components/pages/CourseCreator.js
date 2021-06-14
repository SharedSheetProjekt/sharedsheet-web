import { useState } from 'react';
import { useHistory } from 'react-router';
import { api_create_new_course } from '../../scripts/api';
import ResponseInfo from '../structures/ResponseInfo';

const CourseCreator = ({ loadCoursesCb }) => {
    let history = useHistory();

    const [courseName, setCourseName] = useState('');
    const [validCreation, setValidCreation] = useState(null);

    const handleCourseName = (e) => {
        setCourseName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (courseName !== '') {
            if (await api_create_new_course(courseName)) {
                await loadCoursesCb();
                history.push('/courses');
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
            <h1>Neuen Kurs erstellen</h1>

            <button onClick={() => {
                history.push('/courses');
            }}><span className="material-icons">arrow_back_ios</span> Zurück zur Übersicht</button>

            <form onSubmit={ handleSubmit }>
                <p>Kursname:</p>
                <input type="text" name="courseName" style={{ width: '100%' }} onChange={ handleCourseName } required /><br/><br/>

                <input type="submit" value="Kurs erstellen"/>
            </form>

            <br/>

            <ResponseInfo isValid={ validCreation } validOutput="Kurs-Erstellung erfolgreich!" nonValidOutput="Kurs-Erstellung fehlgeschlagen!" onlyNonValid={ false } />
        </div>
    )
}

export default CourseCreator
