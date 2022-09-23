import Form from 'react-bootstrap/Form';

export default function ExactPhrase({props: {exactPhrase, setExactPhrase}}) {
    return (
        <Form.Group className="mb-1" controlId="exactPhrase">
        <Form.Control type="exact_phrase" placeholder="This exact phrase"
            onChange={(e) => {
              value={exactPhrase}
              e.preventDefault(); 
              setExactPhrase(e.target.value)
            }
          }
        />
        <Form.Text className="text-muted">
          Example: happy hour · contains the exact phrase “happy hour”
        </Form.Text>
      </Form.Group>
    )
}

