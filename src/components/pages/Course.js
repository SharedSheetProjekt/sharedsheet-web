import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { api_load_course_by_id } from '../../scripts/api';
import ResponseInfo from '../structures/ResponseInfo';
import Loader from '../structures/Loader';

const Course = () => {
    let { courseId } = useParams();
    let history = useHistory();

    const [course, setCourse] = useState({});
    const [validCourseId, setValidCourseId] = useState(true);
    const [loading, setLoading] = useState(true);

    const loadCourse = async () => {
        const course = await api_load_course_by_id(courseId);
        if (course) {
            setCourse(course);
        } else {
            setValidCourseId(false);
        }

        setLoading(false);
    }

    useEffect(async () => {
        await loadCourse();
    }, [courseId]);

    if (!validCourseId || course === {} || course === undefined || course === null) {
        return <ResponseInfo isValid={ validCourseId } nonValidOutput="Kurs konnte nicht gefunden werden!" onlyNonValid={ true } />;
    } else {
        return (
            <div>
                <Loader isLoading={loading}></Loader>

                <h1>Kursinfo</h1>
    
                <button onClick={() => {
                    history.push('/courses');
                }}><span className="material-icons">arrow_back_ios</span> Zurück zur Übersicht</button>
                <br/>

                <p>Kursname: {course?.name}</p>
                <p>Mitglieder: </p>
                <ul>
                    {course?.members?.map((member) => {
                        return <li key={member.username}>{member.username} <em>({member.role})</em></li>
                    })}
                </ul>               
            </div>
        )
    }
}

export default Course
