const WidgetScaffold = ({ children }) => {
    const editBar = document.getElementById('editbar');

    const getCoords = (elem) => {
        const box = elem.getBoundingClientRect();
      
        return {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
        };
      }

    const moveEditBar = (e) => {
        const coordinates = getCoords(e.target);
        editBar.style.top = coordinates.bottom + 'px';
        editBar.style.left = coordinates.left + 'px';
        editBar.style.display = 'block';
    }

    const hideEditBar = () => {
        editBar.style.display = 'none';
    }
    

    return (
        <div onMouseEnter={ moveEditBar } onMouseLeave={ hideEditBar } style={{ margin: '2rem 0' }}>
            { children }
        </div>
    )
}

export default WidgetScaffold
