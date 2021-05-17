import { api_delete_widget, api_move_widget } from '../../scripts/api';
import '../../CSS/EditBar.css';
import { useHistory, useRouteMatch } from 'react-router';

const EditBar = ({ deleteWidgetCb, updateWidgetsCb, isVisible }) => {
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const editWidget = (e) => {
        //alert(`Edit: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
        const editbar = e.target.parentElement.parentElement;
        const widgetId = parseInt(editbar.getAttribute('data-focused-widget'));

        history.push(`${url}/edit/${widgetId}`);
    }
    
    const rearrangeWidget = async (e, move) => {
        //alert(`Rearrange: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
        const editbar = e.target.parentElement.parentElement;
        const widgetId = parseInt(editbar.getAttribute('data-focused-widget'));
        
        if (await api_move_widget(widgetId, move)) {
            updateWidgetsCb();
        }
    }
    
    const deleteWidget = async (e) => {
        //alert(`Delete: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
        const editbar = e.target.parentElement.parentElement;
        const widgetId = parseInt(editbar.getAttribute('data-focused-widget'));

        if (widgetId) {
            //editbar.setAttribute('data-focused-widget', '');
            editbar.classList.add('hide');
            if (await api_delete_widget(widgetId)) {
                editbar.classList.remove('hide');
                deleteWidgetCb(widgetId);
            }
            editbar.classList.remove('hide');
        }
    }

    return (
        <div id="editbar" className={ (isVisible ? '' : 'hide') } style={{ position: 'absolute' }}>
            <div>
                <button onClick={ editWidget }>Edit &#9998;</button>
                {/*<button onClick={ rearrangeWidget }>Rearrange &#8645;</button>*/}
                <button onClick={ async (e) => {rearrangeWidget(e, 'down');} }>&#9660;</button>
                <button onClick={ async (e) => {rearrangeWidget(e, 'up');} }>&#9650;</button>
                <button onClick={ deleteWidget } className="red">Delete &#128465;</button>
            </div>
        </div>
    )
}

export default EditBar