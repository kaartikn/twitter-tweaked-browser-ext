import Form from 'react-bootstrap/Form';

export default function MinimumReplies({props: {minimumReplies, setMinimumReplies}}) {
    return (
        <Form.Group className="mb-1" controlId="minimumReplies">
        <Form.Control type="min_replies" placeholder="Minimum replies" 
                        onChange={(e) => {
                        e.preventDefault(); 
                        setMinimumReplies(e.target.value)
                        }
                    }
                />
            <Form.Text className="text-muted">
            Example: 280 · Tweets with at least 280 replies
            </Form.Text>
        </Form.Group>
    )
}

