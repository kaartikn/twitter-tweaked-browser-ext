import Form from 'react-bootstrap/Form';

export default function AllWords({props: {allWords, setAllWords}}) {


    return (
        <Form.Group className="mb-1" controlId="allWords">
        <Form.Control type="all_words" placeholder="All of these words" 
            onChange={(e) => {
              e.preventDefault(); 
              setAllWords(e.target.value);
            }
          } 
        />
        <Form.Text className="text-muted">
          Example: what's happening · contains both “what's” and “happening”
        </Form.Text>
      </Form.Group>
    )

}