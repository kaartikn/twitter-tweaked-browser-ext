import { useContext } from "react"
import { ThemeContext } from "../../popup"
import "./highlightProfileHeader.css"
import Image from "react-bootstrap/Image";
import { handleAccountClick, handleHashtagClick, handleLinkClick } from "../../misc/miscFunctions";

export default function HighlightsProfileHeader(props) {

    const { displayName, verified, protectedAccount, description, username, profileImageUrl, handleShuffleClick } = props

    const handleProfileClick = (e) => {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/" + username});
        });
    }

    var descriptionFinal = []
    
    function formatParagraph(){
        const contentArr = description.split(/\s+/);
        descriptionFinal = contentArr.map((word, index) => {
            const finalWord = word.trim();
            if (finalWord.charAt(0) == '@'){
                return <span style={{pointer: "cursor"}} key={index} className='taggedUser' onClick={() => handleAccountClick(finalWord)}>{finalWord} </span>;
            } else if (finalWord.charAt(0) == '#') {
                return <span style={{pointer: "cursor"}} key={index} className='hashtaggedfinalWord' onClick={() => handleHashtagClick(finalWord)}>{finalWord} </span>;
            } else if (finalWord.substring(0, 4) == "http"){
                return <span style={{pointer: "cursor"}} key={index} onClick={() => handleLinkClick(finalWord)} className='linkedSite'>{finalWord} </span>;
            } else {
                return <span key={index}>{finalWord} </span>;
            }
        });
    }

    formatParagraph();

    //Use to set colors later
    const contextType = useContext(ThemeContext);

    return (
            <div className="d-flex">
                <div>
                    <Image
                        onClick={handleProfileClick}
                        className="main-profile-image mt-2"
                        src={profileImageUrl}
                    />
                </div>
                <div className="d-flex flex-column body-container w-100" style={{paddingRight: "1.5em"}}>
                    <div>
                        <p className="d-inline displayName" onClick={handleProfileClick}>{displayName}</p>
                        {
                            verified ? 
                            <svg className="verified d-inline pointer" onClick={handleProfileClick} viewBox="0 0 24 24" aria-label="Verified account" role="img"><g><path fill={contextType.textColor} d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg> :
                            <></>
                        }
                        {
                            protectedAccount ?
                            <svg viewBox="0 0 24 24" aria-label="Protected account" role="img" className="protectedSymbol"><g><path d="M17.5 7H17v-.25c0-2.76-2.24-5-5-5s-5 2.24-5 5V7h-.5C5.12 7 4 8.12 4 9.5v9C4 19.88 5.12 21 6.5 21h11c1.39 0 2.5-1.12 2.5-2.5v-9C20 8.12 18.89 7 17.5 7zM13 14.73V17h-2v-2.27c-.59-.34-1-.99-1-1.73 0-1.1.9-2 2-2 1.11 0 2 .9 2 2 0 .74-.4 1.39-1 1.73zM15 7H9v-.25c0-1.66 1.35-3 3-3 1.66 0 3 1.34 3 3V7z"></path></g></svg> :
                            <></>
                        }
                    </div>
                    <div className="username">
                        <p className="d-inline" onClick={handleProfileClick}>@{username}</p>
                    </div>
                    <div>
                        <p className="d-inline">{descriptionFinal}</p>
                    </div>
                </div>
                <div className="flex-fill d-flex align-items-center">
                        <p onClick={handleShuffleClick} className="align-text-center shuffleText" style={{fontSize: "0.8em", cursor: "pointer", whiteSpace: "nowrap"}}>⇋ Shuffle</p>
                </div>
            </div>
    )
}