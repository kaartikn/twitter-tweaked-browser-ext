
export default function AllWords(props) {

    const { AllWords, setAllWords } = {props};

    return (
        <Form.Group className="mb-1" controlId="allWords">
        <Form.Control type="all_words" placeholder="All of these words" 
            onChange={(e) => {
              e.preventDefault(); 
              setAllWords(e.target.value);
              console.log(words);
            }
          } 
        />
        <Form.Text className="text-muted">
          Example: what's happening · contains both “what's” and “happening”
        </Form.Text>
      </Form.Group>
    )

}