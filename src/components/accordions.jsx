import Accordion from 'react-bootstrap/Accordion';
import Search from './search'
import './accordions.css';
import Highlights from './highlights';
import Conversations from './conversations';
import Favourites from './favourites';
import Tweet from './tweet';

export default function MyDropdown() {
    return (
        <>
    <Accordion flush>
      <Search eventKey={0} />
      <Highlights eventKey={1} />
      <Conversations eventKey={2} />
      <Favourites eventKey={3} />
      <Tweet eventKey={4} />
    </Accordion>
        </>
    );
}