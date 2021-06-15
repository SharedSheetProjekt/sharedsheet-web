import { useEffect, useState } from 'react';
import { Switch, Route, Link, useHistory, useRouteMatch } from 'react-router-dom';
import { api_create_new_invite_token, api_delete_course, api_load_available_courses } from '../../scripts/api';
import CourseCreator from './CourseCreator';
import CourseJoin from './CourseJoin';
import Course from './Course';
import Loader from '../structures/Loader';

const Courses = () => {
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const [availableCourses, setAvailableCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteCourse = async (courseId) => {
        if (await api_delete_course(courseId))
        {
            setAvailableCourses( availableCourses.filter(course => course.id !== courseId) );
        }
    }

    const loadCourses = async () => {
        const courses = await api_load_available_courses();
        setAvailableCourses(courses);

        // Loader verstecken:
        setLoading(false);
    }
    

    useEffect(async () => {
        await loadCourses();
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
            <Loader isLoading={loading}></Loader>

            <Switch>
                <Route exact path={path}>
                    <h1>Kurse</h1>

                    <button className="icon-desc fullbutton" onClick={() => {
                        history.push('/courses/new');
                    }}><span className="material-icons">school</span>Neuen Kurs erstellen</button>

                    <button className="icon-desc fullbutton" onClick={() => {
                        history.push('/courses/join');
                    }}><span className="material-icons">group_add</span>Kurs beitreten</button>

                    <table className="item-list">
                        <thead>
                            <tr>
                                <th className="left">Name</th>
                                <th className="right">Aktionen</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                (availableCourses ? availableCourses.map((course) => {
                                    // Return the sheet as row, which will redirect the user to the course-view:
                                    return <tr key={ course.id }>
                                            <td onClick={() => history.push('/courses/' + course.id)}>{ course.name }</td>
                                            <td className="right">
                                                <button onClick={() => copyCourseInviteToken(course.id)} className="btn-no-margin icon-desc"><span className="material-icons">person_add</span> Einladen</button>
                                                <button className="btn-no-margin left-margin icon-desc" onClick={() => {deleteCourse(course.id)} }><span className="material-icons">delete</span> Löschen</button>
                                            </td>
                                        </tr>
                                }) : null)
                            }
                        </tbody>
                    </table>

                    {/*<ul>
                        {
                            (availableCourses ? availableCourses.map((course) => {
                                return <li key={course.id} style={{ margin: '1rem 0' }}>
                                            <Link to={'/courses/' + course.id} key={course.id}>{course.name}</Link>
                                            <button title="Einladungs-Token kopieren" onClick={ () => {copyCourseInviteToken(course.id)} } style={{ marginLeft: '1rem' }}><span className="material-icons">person_add</span></button>
                                            <button title="Kurs löschen" onClick={ () => {deleteCourse(course.id)} } style={{ marginLeft: '1rem' }}><span className="material-icons">delete</span></button>
                                        </li>;
                            }) : null)
                        }
                    </ul>*/}
                </Route>
                <Route exact path={`${path}/new`}>
                    <CourseCreator loadCoursesCb={ loadCourses } />
                </Route>
                <Route exact path={`${path}/join`}>
                    <CourseJoin loadCoursesCb={ loadCourses } />
                </Route>
                <Route exact path={`${path}/:courseId`}>
                    <Course />
                </Route>
            </Switch>
        </div>
    )
}

export default Courses
