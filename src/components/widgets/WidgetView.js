import Text from "./Text";
import Image from "./Image";
import TextInput from "./TextInput";
import Upload from "./Upload";

const WidgetView = ({ widget, loadSheetCb }) => {
    const content = JSON.parse(widget.content);

                switch (widget.type) {
                    case 'TextWidget':
                        return <Text widgetID={ widget.id } key={ widget.id } content={ content.content } />;
                        break;
                    case 'ImageWidget':
                        return <Image widgetID={ widget.id } key={ widget.id } src={ content.src } alt={ content.alt } title={ widget.title } />;
                        break;
                    case 'TextInputWidget':
                        return <TextInput widgetID={ widget.id } key={ widget.id } type={ content.fieldType } placeholder={ content.placeholder } title={ widget.title } solutions={ widget.solutions } loadSheetCb={ loadSheetCb } />;
                        break;
                    case 'UploadWidget':
                        return <Upload widgetID={ widget.id } key={ widget.id } hint={ content.hint } fileTypes={ content.filetypes } maxFileSize={ content.size } title={ widget.title } solutions={ widget.solutions } loadSheetCb={ loadSheetCb } />;
                        break;
                    default:
                        return null;
                        break;
    }
}

export default WidgetView;