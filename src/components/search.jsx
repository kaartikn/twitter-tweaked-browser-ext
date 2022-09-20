import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LanguageMenu from './language_menu';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './search.css'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { useState } from 'react';

export default function Search(props) {

    const { eventKey } = props;
    const months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = numberRange(1,31);
    const years = numberRange(2006, new Date().getFullYear())

    function numberRange (start, end) {
      return new Array(end - start).fill().map((d, i) => i + start + 1);
    }

    const [ startMonth, setStartMonth ] = useState("Month");
    const [ endMonth, setEndMonth ] = useState("Month");

    return (
        <>
      <Accordion.Item eventKey={ eventKey }>
        <Accordion.Header>Search</Accordion.Header>
        <Accordion.Body>
            {/* Once results appear, offer the user the ability to search again */}
            {/* Swap main advanced search component for the results */}

            <h5>Words</h5>
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

              <hr />

              <h5>Accounts</h5>

              <Form.Group className="mb-1" controlId="fromAccounts">
                <Form.Control type="any_words" placeholder="From these accounts" />
                <Form.Text className="text-muted">
                  Example: @Twitter · sent from @Twitter
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="toAccounts">
                <Form.Control type="any_words" placeholder="To these accounts" />
                <Form.Text className="text-muted">
                  Example: @Twitter · sent in reply to @Twitter
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="mentioningAccounts">
                <Form.Control type="any_words" placeholder="Mentioning these accounts" />
                <Form.Text className="text-muted">
                  Example: @SFBART @Caltrain · mentions @SFBART or mentions @Caltrain
                </Form.Text>
              </Form.Group>

              <hr />

              <h5>Filters</h5>

              <div className='w-100 row'>
                <p className='col-10 filter-title'>Replies</p>
                <Form.Check
                  className='col-2'
                  reverse
                  type="switch"
                  id="repliesSwitch"
                />
              </div>

              <hr />

              <div className='w-100 row'>
                <p className='col-10 filter-subtitle'>Include replies and original Tweets</p>
                <Form.Check
                  className='col-2'
                  reverse
                  type="radio"
                  id="includeOriginalTweets"
                />
              </div>

              <div className='w-100 row'>
                <p className='col-10 filter-subtitle'>Only show replies</p>
                <Form.Check
                  className='col-2'
                  reverse
                  type="radio"
                  id="excludeOriginalTweets"
                />
              </div>

              <hr />

              <div className='w-100 row'>
                <p className='col-10 filter-title'>Links</p>
                <Form.Check
                  className='col-2'
                  reverse
                  type="radio"
                  id="linksSwitch"
                />
              </div>

              <hr />

              <div className='w-100 row'>
                <p className='col-10 filter-subtitle'>Include Tweets with links</p>
                <Form.Check
                  className='col-2'
                  reverse
                  type="radio"
                  id="includeTweetsWithLinks"
                />
              </div>

              <div className='w-100 row'>
                <p className='col-10 filter-subtitle'>Only show Tweets with links</p>
                <Form.Check
                  className='col-2'
                  reverse
                  type="checkbox"
                  id="onlyShowTweetsWithLinks"
                />
              </div>

              <hr />

              <h5>Engagement</h5>

              <Form.Group className="mb-1" controlId="minimumReplies">
                <Form.Control type="min_replies" placeholder="Minimum replies" />
                <Form.Text className="text-muted">
                  Example: 280 · Tweets with at least 280 replies
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="minimumLikes">
                <Form.Control type="any_words" placeholder="Minimum Likes" />
                <Form.Text className="text-muted">
                  Example: 280 · Tweets with at least 280 Likes
                </Form.Text>
              </Form.Group>              

              <Form.Group className="mb-1" controlId="minimumRetweets">
                <Form.Control type="any_words" placeholder="Minimum Retweets" />
                <Form.Text className="text-muted">
                  Example: 280 · Tweets with at least 280 Retweets
                </Form.Text>
              </Form.Group>              

              <hr/>

              <h5>Dates</h5>
              <p className='filter-subtitle'>From</p>
              <Dropdown className="mb-1 w-100 d-inline">

                  <Dropdown.Toggle
                    className='col-6'
                    id="month"
                    title="Month">
                      {startMonth}
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {
                          months.map((month) => (
                            <Dropdown.Item 
                              onClick={() => setStartMonth(month)}
                              key={month.toLowerCase()}>
                              {month}
                            </Dropdown.Item>
                          ))
                    }
                  </DropdownMenu>

                  <DropdownButton
                    className='col-3'
                    as={ButtonGroup}
                    id="day"
                    title="Day">
                      {
                        days.map((day) => (
                          <Dropdown.Item 
                            key={day}
                            eventKey={day}
                          >
                            {day}
                          </Dropdown.Item>
                        ))
                      }
                  </DropdownButton>

                  <DropdownButton
                    className='col-3'
                    as={ButtonGroup}
                    id="year"
                    title="Year">
                      {
                        years.map((year) => (
                          <Dropdown.Item 
                            key={year}
                            eventKey={year}
                          >
                            {year}
                          </Dropdown.Item>
                        ))
                      }
                  </DropdownButton>

              </Dropdown>

              <p className='filter-subtitle'>To</p>

              <Dropdown className="mb-2 w-100 d-inline">
                  <Dropdown.Toggle
                    className='col-6'
                    id="month"
                    title="Month">
                      {endMonth}
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {
                          months.map((month) => (
                            <Dropdown.Item 
                              onClick={() => setEndMonth(month)}
                              key={month.toLowerCase()}>
                              {month}
                            </Dropdown.Item>
                          ))
                    }
                  </DropdownMenu>

                  <DropdownButton
                    className='col-3'
                    as={ButtonGroup}
                    id="day"
                    title="Day">
                      {
                        days.map((day) => (
                          <Dropdown.Item 
                            key={day}
                            eventKey={day}
                          >
                            {day}
                          </Dropdown.Item>
                        ))
                      }
                  </DropdownButton>

                  <DropdownButton
                    className='col-3'
                    as={ButtonGroup}
                    id="year"
                    title="Year">
                      {
                        years.map((year) => (
                          <Dropdown.Item 
                            key={year}
                            eventKey={year}
                          >
                            {year}
                          </Dropdown.Item>
                        ))
                      }
                  </DropdownButton>

              </Dropdown>






            </Form>
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}