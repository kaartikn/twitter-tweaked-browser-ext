import { useContext } from 'react';
import { ThemeContext } from '../popup';
import Accordion from 'react-bootstrap/Accordion';

export default function Favourites(props) {
    const { eventKey } = props;

    var contextType = useContext(ThemeContext);

    return (
        <>
      <Accordion.Item eventKey={eventKey} style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}}>
        <Accordion.Header>Favourites</Accordion.Header>
        <Accordion.Body>
          <p>Coming soon!</p>   
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}