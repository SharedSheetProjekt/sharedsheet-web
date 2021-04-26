import { api_delete_widget } from '../../scripts/api';
import '../../CSS/EditBar.css';

const EditBar = ({ deleteWidgetCb, isVisible }) => {
    const editWidget = (e) => {
        alert(`Edit: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
    }
    
    const rearrangeWidget = (e) => {
        alert(`Rearrange: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
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
                <button onClick={ rearrangeWidget }>Rearrange &#8645;</button>
                <button onClick={ deleteWidget } className="red">Delete &#128465;</button>
            </div>
        </div>
    )
}

export default EditBar