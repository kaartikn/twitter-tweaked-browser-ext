import Form from 'react-bootstrap/Form';

export default function MentioningAccounts({props: {mentioningAccounts, setMentioningAccounts}}) {
    return (
        <Form.Group className="mb-1" controlId="mentioningAccounts">
            <Form.Control type="mentioning_accounts" placeholder="Mentioning these accounts" 
                onChange={(e) => {
                    value={mentioningAccounts}
                    e.preventDefault(); 
                    setMentioningAccounts(e.target.value);
                    }
                }
            />
            <Form.Text className="text-muted">
                Example: @SFBART @Caltrain · mentions @SFBART or mentions @Caltrain
            </Form.Text>
        </Form.Group>
    )
}

