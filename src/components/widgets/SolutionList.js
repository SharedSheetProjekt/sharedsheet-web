import Moment from 'react-moment';
import { api_delete_solution } from '../../scripts/api';
import FileDownload from '../structures/FileDownload';

const SolutionList = ({ solutions, loadSheetCb }) => {
    const deleteSolution = async (solutionId) => {
        const deletionSuccess = await api_delete_solution(solutionId);
        if (deleteSolution) {
            await loadSheetCb();
        }
    }
    

    if (solutions.length !== 0) {
        return (
            <div>
                <details open="true">
                    <summary style={{ cursor: 'pointer' }}>{(solutions.length > 1 ? 'Deine Lösungen' : 'Deine Lösung')}</summary>
                    {
                        (solutions ? solutions.map((solution) => {
                            return (
                                <div className="card" key={solution.id}>
                                    <span style={{ color: 'grey' }}>
                                        Lösung vom <Moment date={solution.created_at} add={{ hours: 2 }} format="DD.MM.YYYY HH:mm" />
                                    </span>
                                    <br />
                                    {(solution?.type === 'text' ? JSON.parse(solution.content)?.text : <FileDownload fileName={ solution?.comment } solutionId={ solution?.id } solutionToken={solution?.public_token} />)}

                                    <button className="flat-button" style={{display: "block"}} onClick={ () => deleteSolution(solution?.id) }>Entfernen</button>
                                </div>
                            );
                        }) : null)
                    }
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
