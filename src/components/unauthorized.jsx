import { Button } from "react-bootstrap";


export default function Unauthorized(props) {
    return(
        <div className="w-100 d-flex justify-content-center">
            <Button variant="primary" onClick={props.handleClick}> Log in here </Button>
        </div>
    )
}