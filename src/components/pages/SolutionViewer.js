import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { api_load_all_available_solutions_by_sheet_id } from '../../scripts/api';
import Moment from 'react-moment';
import FileDownload from '../structures/FileDownload';

const SolutionViewer = () => {
    let { sheetID } = useParams();
    let history = useHistory();

    const [solutions, setSolutions] = useState([]);
    
    useEffect(async () => {
        const solutions = await api_load_all_available_solutions_by_sheet_id(sheetID);
        if (solutions) {
            setSolutions(Object.values(solutions));
        }
    }, [])

    return (
        <div>
            <h1>Lösungs-Übersicht</h1>

            <button onClick={() => {
                history.push(`/sheets/${sheetID}`);
            }}><span className="material-icons">arrow_back_ios</span> Zurück zur Übersicht</button>

            <br /><br />

            {
                solutions?.map((solutionByUser) => {
                    const solutions = Object.entries(solutionByUser.solutions);
                    return (
                        <details key={solutionByUser.username}>
                            <summary>{solutionByUser.username}</summary>
                                {solutions.map((widgetSolution) => {
                                    return (
                                        <details key={widgetSolution[0]} style={{ paddingLeft: '1rem' }}>
                                            <summary>Widget {widgetSolution[0]}</summary>
                                            {widgetSolution[1].map((solution) => {
                                                return (
                                                    <p key={solution.id} style={{ padding: '0 0 0 1rem', margin: '0.3rem 0' }}>
                                                        <span style={{ color: 'grey' }}>
                                                            Lösung vom <Moment date={solution.created_at} format="DD.MM.YYYY HH:mm" />
                                                        </span>
                                                        <br />
                                                        {(solution?.type === 'text' ? JSON.parse(solution.content)?.text : <FileDownload fileName={ solution?.comment } solutionId={ solution?.id } />)}
                                                    </p>
                                                );
                                            })}
                                        </details>
                                    );
                                })}
                        </details>
                    );
                })
            }
        </div>
    )
}

export default SolutionViewer
