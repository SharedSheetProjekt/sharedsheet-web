import WidgetScaffold from "./WidgetScaffold"

const Text = ({ widgetID, content }) => {
    return (
        <WidgetScaffold widgetID={ widgetID }>
            <p style={{ whiteSpace: 'pre-wrap' }}>{ content }</p>
        </WidgetScaffold>
    )
}

export default Text
