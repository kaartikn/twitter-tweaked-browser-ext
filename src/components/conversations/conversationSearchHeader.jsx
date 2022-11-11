import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import "./conversationSearchHeader.css";

export default function ConversationSearchHeader({props: {otherUsername, setOtherUsername, handleSearchClick}}) {

    return (
        <>
            <InputGroup>
                <Form.Control
                style={{borderRadius: "1rem 0 0 1rem"}}
                    placeholder="username"
                    aria-label="username"
                    value={otherUsername}
                    onChange={(e) => {
                        e.preventDefault();
                        setOtherUsername(e.target.value);
                    }}
                />

                <InputGroup.Text onClick={handleSearchClick} className='searchButton'>Search</InputGroup.Text>
            </InputGroup>

            <Form.Text className="text-muted">Example: kaartik___</Form.Text>

        </>
    )
}