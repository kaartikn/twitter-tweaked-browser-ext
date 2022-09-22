import Form from 'react-bootstrap/Form';

export default function Replies({props: {repliesBool, setRepliesBool, onlyShowReplies, setOnlyShowReplies }}) {
    const handleCheckChange = (e) => {
        setRepliesBool(!repliesBool);
    }
    const handleChange = (e) => {
        if(e.target.id == "includeOriginalTweets"){
            setOnlyShowReplies(false);
        } else if (e.target.id == "excludeOriginalTweets") {
            setOnlyShowReplies(true);
        }
    }
    return (
        <>
              <div className='w-100 row'>
                <p className='col-10 filter-title'>Replies</p>
                <Form.Check
                  className='col-2'
                  reverse
                  checked={repliesBool}
                  onChange={handleCheckChange}
                  type="switch"
                  id="repliesSwitch"
                />
              </div>

              <hr />
                        <div>
                        {
                            repliesBool ?
                            <>
                                    <div className='w-100 row'>
                                        <p className='col-10 filter-subtitle'>Include replies and original Tweets</p>
                                        <Form.Check
                                        name='replies_radio'
                                        className='col-2'
                                        reverse
                                        checked={!onlyShowReplies}
                                        onChange={handleChange}
                                        type="radio"
                                        id="includeOriginalTweets"
                                        />
                                    </div>

                                    <div className='w-100 row'>
                                        <p className='col-10 filter-subtitle'>Only show replies</p>
                                        <Form.Check
                                        name='replies_radio'
                                        className='col-2'
                                        checked={onlyShowReplies}
                                        reverse
                                        onChange={handleChange}
                                        type="radio"
                                        id="excludeOriginalTweets"
                                        />
                                    </div>
                            </> 
                                :
                            <></>
                        }
                        </div>
        </>
    )
}