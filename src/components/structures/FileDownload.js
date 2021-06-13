import { api_download_solution_by_solution_id } from '../../scripts/api';

const FileDownload = ({ fileName, solutionId, solutionToken }) => {
    const handleDownload = async () => {
        // Redirect the user to the download
        window.location.href = 'https://sharedsheets.henrybrink.de/downloads/solutions/' + solutionToken;
    }
    
    
    return (
        <button className="download-button" onClick={ handleDownload }>
            {fileName}
        </button>
    )
}

export default FileDownload
