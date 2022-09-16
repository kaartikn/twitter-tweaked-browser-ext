import Dropdown from 'react-bootstrap/Dropdown';

export default function MyDropdown() {
    return (
        <div className='btn-group btn-block'>
            <Dropdown>
                <Dropdown.Toggle>
                    Search
                </Dropdown.Toggle>
            </Dropdown>
        </div>
    );
}