import { api_upload_new_solution } from "../../scripts/api";
import WidgetScaffold from "./WidgetScaffold";
import SolutionList from "./SolutionList";

const Upload = ({ widgetID, hint, fileTypes, maxFileSize, title, solutions, loadSheetCb }) => {
    const handleUpload = async () => {
        const file = document.getElementById('fileUpload').files[0];
        maxFileSize = parseFloat(maxFileSize);

        if (file) {
            if (file.size / 1000000 /* KB to MB */ <= maxFileSize) {
                const fileType = file.name.split('.')[1];
                if (fileTypes[0] === '*' || fileTypes.includes(fileType)) {
                    let formData = new FormData();
                    formData.append('file', file);
                    formData.append('comment', file.name);

                    const status = await api_upload_new_solution(widgetID, formData);

                    if (!status) {
                        alert('Datei-Upload fehlgeschlagen!');
                    } else {
                        await loadSheetCb();
                    }
                } else {
                    alert('Ungültiger Dateityp!');
                }
            } else {
                alert('Datei ist zu groß!');
            }
        }
    }

    return (
        <WidgetScaffold widgetID={ widgetID }>
            <input id="fileUpload" onInput={ handleUpload } type="file" accept={ fileTypes } style={{ width: '100%' }} />
            <SolutionList solutions={ solutions } loadSheetCb={ loadSheetCb } />
        </WidgetScaffold>
    )
}

export default Upload
