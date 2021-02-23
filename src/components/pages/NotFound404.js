import { useLocation } from "react-router-dom";

const NotFound404 = () => {
    return (
        <div style={{ fontSize: "1.5rem" }}>
            <center>
                <b style={{ fontSize: "10rem" }}>404</b>
                <br/>
                <b>{useLocation().pathname}</b> not found!
            </center>
        </div>
    )
}

export default NotFound404
