import Form from 'react-bootstrap/Form';

export default function AnyWords({props: {anyWords, setAnyWords}}) {
    return (
        <Form.Group className="mb-1" controlId="anyWords">
        <Form.Control type="any_words" placeholder="Any of these words" 
            onChange={(e) => {
              e.preventDefault(); 
              setAnyWords(e.target.value)
              console.log(anyWords);
            }
          }
        />
        <Form.Text className="text-muted">
            Example: cats dogs · contains either “cats” or “dogs” (or both)
        </Form.Text>
      </Form.Group>
    )
}

