import WidgetScaffold from "./WidgetScaffold"

const Text = ({ widgetID, content }) => {
    return (
        <WidgetScaffold widgetID={ widgetID }>
            <p>{ content }</p>
        </WidgetScaffold>
    )
}

export default Text
