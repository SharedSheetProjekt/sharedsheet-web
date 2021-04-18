import WidgetScaffold from "./WidgetScaffold"

const Text = ({ content }) => {
    return (
        <WidgetScaffold>
            <p>{ content }</p>
        </WidgetScaffold>
    )
}

export default Text
