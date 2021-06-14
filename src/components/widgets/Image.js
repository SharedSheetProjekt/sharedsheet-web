import WidgetScaffold from "./WidgetScaffold"

const Image = ({ widgetID, src, alt, title }) => {
    return (
        <WidgetScaffold widgetID={ widgetID }>
            <center><img src={ src } alt={ alt } style={{ maxWidth: '100%' }} /></center>
            <div style={{ textAlign: 'center', color: 'grey' }}>{ title }</div>
        </WidgetScaffold>
    )
}

export default Image
