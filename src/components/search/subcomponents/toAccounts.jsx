import Form from 'react-bootstrap/Form';

export default function ToAccounts({props: {toAccounts, setToAccounts}}) {
    return (
        <Form.Group className="mb-1" controlId="toAccounts">
            <Form.Control type="to_accounts" placeholder="To these accounts" 
                onChange={(e) => {
                    e.preventDefault(); 
                    setToAccounts(e.target.value)
                    console.log(toAccounts);
                    }
                }
            />
            <Form.Text className="text-muted">
                Example: @Twitter · sent in reply to @Twitter
            </Form.Text>
        </Form.Group>
    )
}

