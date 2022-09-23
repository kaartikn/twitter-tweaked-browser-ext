import Form from "react-bootstrap/Form";

export const languages = {
    "Any Language": "Any Language",
    "Arabic": "Arabic",
    "Arabic Feminine": "Arabic Feminine",
    "Bangla": "Bangla",
    "Basque": "Basque",
    "Bulgarian": "Bulgarian",
    "Catalan": "Catalan",
    "Croatian": "Croatian",
    "Czech": "Czech",
    "Danish": "Danish",
    "Dutch": "Dutch",
    "English": "English",
    "Finnish": "Finnish",
    "French": "French",
    "German": "German",
    "Greek": "Greek",
    "Gujarati": "Gujarati",
    "Hebrew": "Hebrew",
    "Hindi": "Hindi",
    "Hungarian": "Hungarian",
    "Indonesian": "Indonesian",
    "Italian": "Italian",
    "Japanese": "Japanese",
    "Kannada": "Kannada",
    "Korean": "Korean",
    "Marathi": "Marathi",
    "Norwegian": "Norwegian",
    "Persian": "Persian",
    "Polish": "Polish",
    "Portuguese": "Portuguese",
    "Romanian": "Romanian",
    "Russian": "Russian",
    "Serbian": "Serbian",
    "Simplified Chinese": "Simplified Chinese",
    "Slovak": "Slovak",
    "Spanish": "Spanish",
    "Swedish": "Swedish",
    "Tamil": "Tamil",
    "Thai": "Thai",
    "Traditional Chinese": "Traditional Chinese",
    "Turkish": "Turkish",
    "Ukrainian": "Ukrainian",
    "Urdu": "Urdu",
    "Vietnamese": "Vietnamese"
}

export default function LanguageMenu({props: {language, setLanguage}}) {


    return (
              <Form.Group className="mb-1">
              <Form.Select
                    onChange={(e) => {
                      e.preventDefault(); 
                      setLanguage(e.target.value);
                    }
                  }>
                {
                  Object.keys(languages).map((language) => {
                    return <option key={languages[language]}>{languages[language]}</option>;
                  })
                }                
              </Form.Select>
            </Form.Group>
    );
}