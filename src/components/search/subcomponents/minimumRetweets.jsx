import Form from 'react-bootstrap/Form';

export default function MinimumRetweets({props: {minimumRetweets, setMinimumRetweets}}) {
    return (
        <Form.Group className="mb-1" controlId="minimumRetweets">
        <Form.Control type="min_retweets" placeholder="Minimum Retweets" 
            onChange={(e) => {
                e.preventDefault(); 
                setMinimumRetweets(e.target.value)
                console.log(minimumRetweets);
                }
            }
        />
        <Form.Text className="text-muted">
          Example: 280 · Tweets with at least 280 Retweets
        </Form.Text>
      </Form.Group>  

    )
}

