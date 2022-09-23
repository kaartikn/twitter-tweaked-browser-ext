import Form from 'react-bootstrap/Form';

export default function FromAccounts({props: {fromAccounts, setFromAccounts}}) {
    return (

        <Form.Group className="mb-1" controlId="fromAccounts">
        <Form.Control type="from_accounts" placeholder="From these accounts" 
            onChange={(e) => {
                value={fromAccounts}
                e.preventDefault(); 
                setFromAccounts(e.target.value);
                }
            }
        />

        <Form.Text className="text-muted">
          Example: @Twitter · sent from @Twitter
        </Form.Text>
      </Form.Group>


    )
}

