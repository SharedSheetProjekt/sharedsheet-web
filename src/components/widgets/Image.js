import WidgetScaffold from "./WidgetScaffold"

const Image = ({ widgetID, src, alt }) => {
    return (
        <WidgetScaffold widgetID={ widgetID }>
            <img src={ src } alt={ alt } style={{ maxWidth: '100%' }} />
        </WidgetScaffold>
    )
}

export default Image
