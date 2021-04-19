import '../../CSS/EditBar.css';

const EditBar = ({ isVisible }) => {
    const editWidget = (e) => {
        alert(`Edit: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
    }
    
    const rearrangeWidget = (e) => {
        alert(`Rearrange: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
    }
    
    const deleteWidget = (e) => {
        alert(`Delete: ${e.target.parentElement.parentElement.getAttribute('data-focused-widget')}`);
    }

    return (
        <div id="editbar" className={ (isVisible ? '' : 'hide') } style={{ position: 'absolute' }}>
            <div>
                <button onClick={ editWidget }>Edit &#9998;</button>
                <button onClick={ rearrangeWidget }>Rearrange &#8645;</button>
                <button onClick={ deleteWidget } class="red">Delete &#128465;</button>
                {/*e.target.parentElement.parentElement.getAttribute('data-focused-widget')*/}
            </div>
        </div>
    )
}

export default EditBar