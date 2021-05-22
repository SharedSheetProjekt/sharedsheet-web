import { useEffect, useState } from 'react';
import { Switch, Route, Link, useHistory, useRouteMatch } from 'react-router-dom';
import { api_create_new_invite_token, api_delete_course, api_load_available_courses } from '../../scripts/api';
import CourseCreator from './CourseCreator';
import CourseJoin from './CourseJoin';
import Course from './Course';

const Courses = () => {
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const [availableCourses, setAvailableCourses] = useState([
        {
          "id": 0,
          "name": "string",
          "members": [
            {
              "username": "string",
              "role": "string"
            }
          ]
        }
      ]);

    const deleteCourse = async (courseId) => {
        if (await api_delete_course(courseId))
        {
            setAvailableCourses( availableCourses.filter(course => course.id !== courseId) );
        }
    }

    useEffect(async () => {
        const courses = await api_load_available_courses();
        //setAvailableCourses(courses);
    }, []);

    const copyCourseInviteToken = async (courseId) => {
        const inviteToken = await api_create_new_invite_token(courseId);
        if (inviteToken) {
            alert(`Einladungs-Token: ${inviteToken}`);
        } else {
            alert('Fehler bei der Erstellung eines Einladungs-Tokens!');
        }
    }
    

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h1>Kurse <span style={{ color: 'red' }}>(WIP)</span></h1>

                    <button className="icon-desc" onClick={() => {
                        history.push('/courses/new');
                    }}><span className="material-icons">school</span>Neuen Kurs erstellen</button>

                    <button className="icon-desc" onClick={() => {
                        history.push('/courses/join');
                    }}><span className="material-icons">group_add</span>Kurs beitreten</button>

                    <h2>Eigene Kurse</h2>
                    <ul>
                        {
                            (availableCourses ? availableCourses.map((course) => {
                                return <li key={course.id} style={{ margin: '1rem 0' }}>
                                            <Link to={'/course/' + course.id} key={course.id}>{course.name}</Link>
                                            <button title="Einladungs-Token kopieren" onClick={ () => {copyCourseInviteToken(course.id)} } style={{ marginLeft: '1rem' }}><span className="material-icons">person_add</span></button>
                                            <button title="Kurs löschen" onClick={ () => {deleteCourse(course.id)} } style={{ marginLeft: '1rem' }}><span className="material-icons">delete</span></button>
                                        </li>;
                            }) : null)
                        }
                    </ul>
                </Route>
                <Route exact path={`${path}/new`}>
                    <CourseCreator />
                </Route>
                <Route exact path={`${path}/join`}>
                    <CourseJoin />
                </Route>
                <Route exact path={`${path}/:courseID`}>
                    <Course />
                </Route>
            </Switch>
        </div>
    )
}

export default Courses
