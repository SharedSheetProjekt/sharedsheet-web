import Moment from 'react-moment';

const SolutionList = ({ solutions }) => {
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
                                    <span style={{ color: 'grey' }}>Lösung vom <Moment date={solution.created_at} add={{ hours: 2 }} format="DD.MM.YYYY HH:mm" /></span>
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
