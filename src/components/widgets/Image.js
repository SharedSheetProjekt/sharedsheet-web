const Image = ({ src, alt }) => {
    return (
        <div>
            <img src={ src } alt={ alt } style={{ maxWidth: '100%' }} />
        </div>
    )
}

export default Image
