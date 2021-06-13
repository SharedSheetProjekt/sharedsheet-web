import { api_download_solution_by_solution_id } from '../../scripts/api';

const FileDownload = ({ fileName, solutionId }) => {
    const handleDownload = async () => {
        await api_download_solution_by_solution_id(solutionId);
    }
    
    
    return (
        <button className="download-button" onClick={ handleDownload }>
            {fileName}
        </button>
    )
}

export default FileDownload
