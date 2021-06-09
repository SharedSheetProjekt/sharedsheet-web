import WidgetScaffold from "./WidgetScaffold"

const Upload = ({ widgetID, hint, fileTypes, maxFileSize, title }) => {
    return (
        <WidgetScaffold widgetID={ widgetID }>
            <p>{ title } <br /> <i>{ hint }</i></p>
            <input type="file" accept={ fileTypes } style={{ width: '100%' }} />
        </WidgetScaffold>
    )
}

export default Upload
