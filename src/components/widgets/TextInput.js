import WidgetScaffold from "./WidgetScaffold"

const TextInput = ({ type, placeholder }) => {
    return (
        <WidgetScaffold>
            <input type={ type } placeholder={ placeholder } />
        </WidgetScaffold>
    )
}

export default TextInput
