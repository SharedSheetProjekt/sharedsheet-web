import Moment from 'react-moment';
import { api_delete_solution } from '../../scripts/api';

const SolutionList = ({ solutions }) => {
    const deleteSolution = async (solutionId) => {
        const deletionSuccess = await api_delete_solution(solutionId);
        if (deleteSolution) {
            window.location.reload();
            return false;
        }
    }
    

    if (solutions.length !== 0) {
        return (
            <div>
                <details>
                    <summary style={{ cursor: 'pointer' }}>{(solutions.length > 1 ? 'Deine Lösungen' : 'Deine Lösung')}</summary>
                    <ul>
                    {
                        (solutions ? solutions.map((solution) => {
                            return (
                                <li key={solution.id}>
                                    <span style={{ color: 'grey' }}>
                                        Lösung vom <Moment date={solution.created_at} add={{ hours: 2 }} format="DD.MM.YYYY HH:mm" />
                                        <button onClick={ async () => {deleteSolution(solution.id)} } style={{ marginLeft: '1rem' }} title="Lösung löschen"><span className="material-icons">delete</span></button>
                                    </span>
                                    <br />
                                    {JSON.parse(solution.content)?.text}
                                </li>
                            );
                        }) : null)
                    }
                    </ul>
                </details>
            </div>
        )
    }
    else
    {
        return null;
    }
}

export default SolutionList
