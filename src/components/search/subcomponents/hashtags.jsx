import Form from 'react-bootstrap/Form';

export default function HashtagWords({props: {hashtags, setHashtags}}) {
    return (
        <Form.Group className="mb-1" controlId="hashtags">
        <Form.Control type="any_words" placeholder="These hashtags" 
                    onChange={(e) => {
                        e.preventDefault(); 
                        setHashtags(e.target.value)
                      }
                    }
                  />
        <Form.Text className="text-muted">
          Example: #ThrowbackThursday · contains the hashtag #ThrowbackThursday
        </Form.Text>
      </Form.Group>

    )
}

