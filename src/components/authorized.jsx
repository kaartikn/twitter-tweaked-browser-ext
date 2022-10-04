import Accordion from 'react-bootstrap/Accordion';
import Search from './search/search'
import './accordions.css';
import Highlights from './highlights';
import Conversations from './conversations';
import Favourites from './favourites';
import PostTweet from './postTweet';

export default function Authorized(props) {

    return (
        <>
            <Accordion flush defaultActiveKey={0}>
                <Search eventKey={0} />
                <Highlights eventKey={1} />
                <Conversations eventKey={2} />
                <Favourites eventKey={3} />
                <PostTweet eventKey={4} />
            </Accordion>
        </>
    );
}