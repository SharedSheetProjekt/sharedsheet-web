import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { api_load_course_by_id } from '../../scripts/api';
import ResponseInfo from '../structures/ResponseInfo';

const Course = () => {
    let { courseId } = useParams();
    let history = useHistory();

    const [course, setCourse] = useState({});
    const [validCourseId, setValidCourseId] = useState(true);

    const loadCourse = async () => {
        const course = await api_load_course_by_id(courseId);
        if (course) {
            setCourse(course);
        } else {
            setValidCourseId(false);
        }
    }

    useEffect(async () => {
        await loadCourse();
    }, []);

    if (!validCourseId) {
        return <ResponseInfo isValid={ validCourseId } nonValidOutput="Kurs konnte nicht gefunden werden!" onlyNonValid={ true } />;
    } else {
        return (
            <div>
                <h1>Kursinfo</h1>
    
                <button onClick={() => {
                    history.push('/courses');
                }}><span className="material-icons">arrow_back_ios</span> Zurück zur Übersicht</button>
                <br/>

                <p>Kursname: {course.name}</p>
                <p>
                    Mitglieder: <br/>
                    <ul>
                        {course.members.map((member) => {
                            return <li>{member.username} <em>({member.role})</em></li>
                        })}
                    </ul>
                </p>               
            </div>
        )
    }
}

export default Course
