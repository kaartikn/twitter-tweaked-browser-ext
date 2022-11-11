import Accordion from 'react-bootstrap/Accordion';
import { getAuthorizedDataFromCache } from '../../misc/miscFunctions';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../popup';
import { useState } from 'react';

export default function Conversations(props) {
    const {eventKey} = props;

    const [ accountUsername, setAccountUsername ] = useState();

    var contextType = useContext(ThemeContext);

    useEffect(() => {
      getAuthorizedDataFromCache().then((authorizedObject) => {
        setAccountUsername(authorizedObject['username']);
      });
    }, []);


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