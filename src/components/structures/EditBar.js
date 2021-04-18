import '../../CSS/EditBar.css';

const EditBar = ({ isVisible }) => {
    return (
        <div id="editbar" className={ (isVisible ? '' : 'hide') } style={{ position: 'absolute' }}>
            <div>
                <button>Edit &#9998;</button>
                <button>Rearrange &#8645;</button>
                <button class="red">Delete &#128465;</button>
            </div>
        </div>
    )
}

export default EditBar