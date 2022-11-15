import Accordion from 'react-bootstrap/Accordion';
import Search from './search/search'
import './accordions.css';
import Highlights from './highlights/highlights';
import Favourites from './favourites';
import PostTweet from './postTweet';
import "./authorized.css";
import Conversations from './conversations/conversations';

export default function Authorized(props) {

    return (
        <>
            <Accordion flush>
                <Highlights eventKey={0} />
                <Conversations eventKey={1} />
                <Search eventKey={2} />
                <Favourites eventKey={3} />
                <PostTweet eventKey={4} />
            </Accordion>
        </>
    );
}