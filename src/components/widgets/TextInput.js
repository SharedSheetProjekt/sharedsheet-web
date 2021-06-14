import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { api_create_new_solution } from "../../scripts/api";
import WidgetScaffold from "./WidgetScaffold";
import SolutionList from './SolutionList';

const TextInput = ({ widgetID, type, placeholder, title, solutions, loadSheetCb }) => {
    let {path, url} = useRouteMatch();
    const history = useHistory();

    const [solution, setSolution] = useState('');

    const handleInputChange = (e) => {
        setSolution(e.target.value);
    }
    

    return (
        <WidgetScaffold widgetID={ widgetID }>
            <input type={ type } placeholder={ placeholder } onChange={ handleInputChange } />
            <button className="fullbutton animated-button" style={{display: solution != '' ? 'block' : 'none'}}  onClick={ async () => {
                if (solution) {
                    await api_create_new_solution(widgetID, 'text', JSON.stringify({text: solution}));
                    window.location.reload();
                    return false;
                }
            } }>Abgeben</button>
            <SolutionList solutions={ solutions } loadSheetCb={ loadSheetCb } />
        </WidgetScaffold>
    )
}

export default TextInput
