import { useState } from 'react';
import { useHistory } from 'react-router';
import { api_join_course_with_token } from "../../scripts/api";
import ResponseInfo from "../structures/ResponseInfo";

const CourseJoin = () => {
    let history = useHistory();
    let errorString = 'Kurs konnte nicht beigetreten werden!';
    const [validJoin, setValidJoin] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document.getElementById('token').value;
        if (token) {
            const status = await api_join_course_with_token(token);
            switch (parseInt(status)) {
                case 204:
                    setValidJoin(true);
                    break;
                case 401:
                    errorString = 'Kurs ist bereits beigetreten worden!';
                    setValidJoin(false);
                    break;
                default:
                    errorString = 'Kurs konnte nicht beigetreten werden!';
                    setValidJoin(false);
                    break;
            }
        }
    }
    

    return (
        <div>
            <h1>Kurs beitreten</h1>

            <button onClick={() => {
                history.push('/courses');
            }}><span className="material-icons">arrow_back_ios</span> Zurück zur Übersicht</button>
            <br/>

            <form onSubmit={handleSubmit}>
                <p>Einladungs-Token:</p>
                <input type="text" id="token" />
                <br/><br/>
                <input type="submit" value="Beitreten" />
            </form>
            <br />
            <ResponseInfo isValid={ validJoin } validOutput="Kurs erfolgreich beigetreten!" nonValidOutput={ errorString } onlyNonValid={ false } />
        </div>
    )
}

export default CourseJoin
