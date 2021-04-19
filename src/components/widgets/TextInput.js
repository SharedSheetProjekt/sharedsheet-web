import WidgetScaffold from "./WidgetScaffold"

const TextInput = ({ widgetID, type, placeholder }) => {
    return (
        <WidgetScaffold widgetID={ widgetID }>
            <input type={ type } placeholder={ placeholder } />
        </WidgetScaffold>
    )
}

export default TextInput
