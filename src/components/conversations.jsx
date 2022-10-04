import Accordion from 'react-bootstrap/Accordion';
import { useContext } from 'react';
import { ThemeContext } from '../popup';

export default function Conversations(props) {
    const {eventKey} = props;

    var contextType = useContext(ThemeContext);

    return (
        <>
      <Accordion.Item eventKey={eventKey} style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}}>
        <Accordion.Header>Conversations</Accordion.Header>
        <Accordion.Body>
          <p>Coming soon!</p>   
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}