import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyDropdown() {
    return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Search
                </Dropdown.Toggle>
            </Dropdown>
    );
}