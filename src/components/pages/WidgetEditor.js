import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const WidgetEditor = () => {
    let { sheetID, widgetID } = useParams();
    let history = useHistory();

    useEffect(() => {
        // TODO: API call for widget by ID
    }, []);

    return (
        <div>
            <h1>WidgetEditor</h1>
            <p>{`Sheet-ID: ${sheetID}, Widget-ID: ${widgetID}`}</p>
        </div>
    )
}

export default WidgetEditor
