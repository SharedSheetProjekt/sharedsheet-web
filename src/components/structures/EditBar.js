import { api_delete_widget, api_move_widget } from '../../scripts/api';
import '../../CSS/EditBar.css';
import { useHistory, useRouteMatch } from 'react-router';

const EditBar = ({ deleteWidgetCb, updateWidgetsCb, isVisible }) => {
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const editWidget = (e) => {
        //alert(`Edit: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
        const editbar = e.target.parentElement.parentElement;
        console.log(editbar.getAttribute('data-focused-widget'))
        const widgetId = parseInt(editbar.getAttribute('data-focused-widget'));

        history.push(`${url}/edit/${widgetId}`);
    }
    
    const rearrangeWidget = async (e, move) => {
        //alert(`Rearrange: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
        const editbar = e.target.parentElement.parentElement;
        console.log(editbar.getAttribute('data-focused-widget'))
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
                <button onClick={ editWidget } className="icon-desc"><span className="material-icons icon-desc">edit</span> Editieren</button>
                {/*<button onClick={ rearrangeWidget }>Rearrange &#8645;</button>*/}
                <button onClick={ async (e) => {rearrangeWidget(e, 'down');} }><span className="material-icons">arrow_downward</span></button>
                <button onClick={ async (e) => {rearrangeWidget(e, 'up');} }><span className="material-icons">arrow_upward</span></button>
                <button onClick={ deleteWidget } className="red icon-desc"><span className="material-icons">delete</span> Löschen</button>
            </div>
        </div>
    )
}

export default EditBar