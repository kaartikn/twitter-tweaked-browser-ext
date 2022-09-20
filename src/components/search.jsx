import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LanguageMenu from './language_menu';

export default function Search(props) {

    const { eventKey } = props;

    return (
        <>
      <Accordion.Item eventKey={ eventKey }>
        <Accordion.Header>Search</Accordion.Header>
        <Accordion.Body>
            {/* Once results appear, offer the user the ability to search again */}
            {/* Swap main advanced search component for the results */}

            <Form>
              <Form.Group className="mb-1" controlId="allWords">
                <Form.Control type="all_words" placeholder="All of these words" />
                <Form.Text className="text-muted">
                  Example: what's happening · contains both “what's” and “happening”
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="exactPhrase">
                <Form.Control type="all_words" placeholder="This exact phrase" />
                <Form.Text className="text-muted">
                  Example: happy hour · contains the exact phrase “happy hour”
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="anyWords">
                <Form.Control type="any_words" placeholder="Any of these words" />
                <Form.Text className="text-muted">
                  Example: cats dogs · contains either “cats” or “dogs” (or both)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="noneWords">
                <Form.Control type="any_words" placeholder="None of these words" />
                <Form.Text className="text-muted">
                  Example: cats dogs · does not contain “cats” and does not contain “dogs”
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="hashtags">
                <Form.Control type="any_words" placeholder="These hashtags" />
                <Form.Text className="text-muted">
                  Example: #ThrowbackThursday · contains the hashtag #ThrowbackThursday
                </Form.Text>
              </Form.Group>

              <LanguageMenu />




            </Form>
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}