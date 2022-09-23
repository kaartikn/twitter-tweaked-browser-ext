import Form from 'react-bootstrap/Form';

export default function NoneWords({props: {noneWords, setNoneWords}}) {
    return (

        <Form.Group className="mb-1" controlId="noneWords">
        <Form.Control type="none_words" placeholder="None of these words" 
            onChange={(e) => {
              e.preventDefault(); 
              setNoneWords(e.target.value)
            }
          }
        />
        <Form.Text className="text-muted">
          Example: cats dogs · does not contain “cats” and does not contain “dogs”
        </Form.Text>
      </Form.Group>
    )
}

