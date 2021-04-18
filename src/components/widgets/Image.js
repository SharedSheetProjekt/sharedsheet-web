import WidgetScaffold from "./WidgetScaffold"

const Image = ({ src, alt }) => {
    return (
        <WidgetScaffold>
            <img src={ src } alt={ alt } style={{ maxWidth: '100%' }} />
        </WidgetScaffold>
    )
}

export default Image
