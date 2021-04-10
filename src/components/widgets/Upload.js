const Upload = ({ hint, fileTypes, maxFileSize }) => {
    return (
        <div>
            <p>{ hint }</p>
            <input type="file" accept={ fileTypes } />
        </div>
    )
}

export default Upload
