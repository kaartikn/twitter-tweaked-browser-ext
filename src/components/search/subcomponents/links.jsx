import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';

export default function Links({props: {linksBool, setLinksBool, onlyShowTweetsWithLinksBool, setOnlyShowTweetsWithLinksBool }}) {
    const handleCheckChange = (e) => {
        setLinksBool(!linksBool)
    }
    
    const handleRadioChange = (e) => {
        if(e.target.id == "showTweetsWithAndWithoutLinks"){
            setOnlyShowTweetsWithLinksBool(false);
        } else if (e.target.id == "onlyShowTweetsWithLinks") {
            setOnlyShowTweetsWithLinksBool(true);
        }
    }
    return (
        <>
                <div className='w-100 row'>
                <p className='col-10 filter-title'>Links</p>
                <Form.Check
                    className='col-2'
                    reverse
                    checked={linksBool}
                    onChange={handleCheckChange}
                    type="switch"
                    id="linksSwitch"
                />
              </div>

              <hr />

                <div>
                    {
                        linksBool ?
                        <>
                        <div className='w-100 row'>
                            <p className='col-10 filter-subtitle'>Include Tweets with links</p>
                            <Form.Check
                                name='links_radio'
                                className='col-2'
                                reverse
                                checked={!onlyShowTweetsWithLinksBool}
                                onChange={handleRadioChange}
                                type="radio"
                                id="showTweetsWithAndWithoutLinks"
                            />
                        </div>

                        <div className='w-100 row'>
                            <p className='col-10 filter-subtitle'>Only show Tweets with links</p>
                            <Form.Check
                                name='links_radio'
                                className='col-2'
                                checked={onlyShowTweetsWithLinksBool}
                                reverse
                                onChange={handleRadioChange}
                                type="radio"
                                id="onlyShowTweetsWithLinks"
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