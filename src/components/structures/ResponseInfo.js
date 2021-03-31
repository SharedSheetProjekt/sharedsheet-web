import '../../CSS/ResponseInfo.css';

const ResponseInfo = ({ isValid, validOutput, nonValidOuput, onlyNonValid }) => {
    if (isValid && !onlyNonValid)
    {
        return <div className="response valid">{ validOutput }</div>;
    } else if (!isValid && isValid !== null) {
        return <div className="response non-valid">{ nonValidOuput }</div>;
    } else {
        return '';
    }
}

export default ResponseInfo
