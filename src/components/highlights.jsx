import Accordion from 'react-bootstrap/Accordion';
import { useContext } from 'react';
import { ThemeContext } from '../popup';

export default function Highlights(props) {
    const { eventKey } = props;

    var contextType = useContext(ThemeContext);

    return (
        <>
      <Accordion.Item eventKey={ eventKey } style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}} >
        <Accordion.Header>Highlights</Accordion.Header>
        <Accordion.Body>
          Coming soon!
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}