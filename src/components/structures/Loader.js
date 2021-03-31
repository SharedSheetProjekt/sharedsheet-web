import '../../CSS/Loader.css';

const Loader = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div id="loader-container">
                <div id="loader"></div>
            </div>
        )
    } else {
        return null;
    }
}

export default Loader
