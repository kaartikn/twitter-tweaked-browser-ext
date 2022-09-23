import Form from 'react-bootstrap/Form';

export default function MinimumLikes({props: {minimumLikes, setMinimumLikes}}) {
    return (
        <Form.Group className="mb-1" controlId="minimumLikes">
        <Form.Control type="min_likes" placeholder="Minimum likes" 
                        onChange={(e) => {
                        value={minimumLikes}
                        e.preventDefault(); 
                        setMinimumLikes(e.target.value);
                        }
                    }
                />
            <Form.Text className="text-muted">
            Example: 280 · Tweets with at least 280 likes
            </Form.Text>
        </Form.Group>
    )
}

