import '../../CSS/ResponseInfo.css';

const ResponseInfo = ({ isValid, validOutput, nonValidOutput, onlyNonValid }) => {
    if (isValid && !onlyNonValid)
    {
        return <div className="response valid">{ validOutput }</div>;
    } else if (!isValid && isValid !== null) {
        return <div className="response non-valid">{ nonValidOutput }</div>;
    } else {
        return '';
    }
}

export default ResponseInfo
