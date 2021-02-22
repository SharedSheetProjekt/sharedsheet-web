import { useParams } from "react-router-dom";

const Sheet = () => {

    let { sheetID } = useParams();

    return (
        <div>
            {sheetID}      
        </div>
    )
}

export default Sheet
