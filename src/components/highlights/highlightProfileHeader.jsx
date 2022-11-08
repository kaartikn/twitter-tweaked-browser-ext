import { useContext } from "react"
import { ThemeContext } from "../../popup"
import "./highlightProfileHeader.css"
import Image from "react-bootstrap/Image";

export default function HighlightsProfileHeader(props) {

    const { displayName, verified, description, username, profileImageUrl, handleShuffleClick } = props

    const handleProfileClick = (e) => {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/" + username});
        });
    }

    //Use to set colors later
    const contextType = useContext(ThemeContext);

    return (
            <div className="d-flex">
                <div>
                    <Image
                        onClick={handleProfileClick}
                        className="profile-image mt-2"
                        src={profileImageUrl}
                    />
                </div>
                <div className="d-flex flex-column body-container w-100">
                    <div>
                        <p className="d-inline displayName" onClick={handleProfileClick}>{displayName}</p>
                        {
                            verified ? 
                            <svg className="verified d-inline pointer" onClick={handleProfileClick} viewBox="0 0 24 24" aria-label="Verified account" role="img"><g><path fill={contextType.textColor} d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg> :
                            <></>
                        }
                    </div>
                    <div className="username">
                        <p className="d-inline" onClick={handleProfileClick}>@{username}</p>
                    </div>
                    <div className="username">
                        <p className="d-inline" onClick={handleProfileClick}>{description}</p>
                    </div>
                </div>
                <div className="flex-fill d-flex align-items-center">
                        <svg onClick={handleShuffleClick} viewBox="0 0 16 16" aria-hidden="true" className="shuffleIcon"><path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"></path><path d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"></path></svg>
                        <p onClick={handleShuffleClick} className="align-text-center" style={{fontSize: "0.8em", cursor: "pointer"}}>Shuffle</p>
                </div>
            </div>
    )
}