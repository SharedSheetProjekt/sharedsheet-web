import WidgetScaffold from "./WidgetScaffold"

const Upload = ({ widgetID, hint, fileTypes, maxFileSize }) => {
    return (
        <WidgetScaffold widgetID={ widgetID }>
            <p>{ hint }</p>
            <input type="file" accept={ fileTypes } />
        </WidgetScaffold>
    )
}

export default Upload
