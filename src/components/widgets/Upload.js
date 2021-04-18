import WidgetScaffold from "./WidgetScaffold"

const Upload = ({ hint, fileTypes, maxFileSize }) => {
    return (
        <WidgetScaffold>
            <p>{ hint }</p>
            <input type="file" accept={ fileTypes } />
        </WidgetScaffold>
    )
}

export default Upload
