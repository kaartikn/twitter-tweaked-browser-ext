import { languages } from "../components/search/subcomponents/language_menu";

export function doAdvancedSearch() {
    return fetch("http://localhost:8081/search")
        .then(data => data.json())
}

export function splitStringToArr(str){
    return str.trim().split(/\s+/);
}

export function removeAtFromString(str){
    return str.replace(/@/g, '');
}

export function convertLanguageTo2CharCode(language){
    switch (language){
        case "":
        case languages["Any Language"]:
            return "";
        case languages.Arabic:
            return "ar";
        case languages["Arabic Feminine"]:
            return "ar-x-fm";
        case languages.Bangla:
            return "bn";
        case languages.Basque:
            return "eu";
        case languages.Bulgarian:
            return "bg";
        case languages.Catalan:
            return "ca";
        case languages.Croatian:
            return "hr";
        case languages.Czech:
            return "cz";
        case languages.Danish:
            return "da";
        case languages.Dutch:
            return "nl"
        case languages.English:
            return "en";
        case languages.Finnish:
            return "fi";
        case languages.French:
            return "fr";
        case languages.German:
            return "de";
        case languages.Greek:
            return "el";
        case languages.Gujarati:
            return "gu";
        case languages.Hebrew:
            return "he";
        case languages.Hindi:
            return "hi";
        case languages.Hungarian:
            return "hu";
        case languages.Indonesian:
            return "id";
        case languages.Italian:
            return "it";
        case languages.Japanese:
            return "ja";
        case languages.Kannada:
            return "kn";
        case languages.Korean:
            return "ko";
        case languages.Marathi:
            return "mr";
        case languages.Norwegian:
            return "no";
        case languages.Persian:
            return "fa";
        case languages.Polish:
            return "pl";
        case languages.Portuguese:
            return "pt";
        case languages.Romanian:
            return "ro";
        case languages.Russian:
            return "ru";
        case languages.Serbian:
            return "sr";
        case languages["Simplified Chinese"]:
            return "zh-cn"
        case languages.Slovak:
            return "sk";
        case languages.Spanish:
            return "es";
        case languages.Swedish:
            return "sv";
        case languages.Tamil:
            return "ta";
        case languages.Thai:
            return "th";
        case languages["Traditional Chinese"]:
            return "zh-tw";
        case languages.Turkish:
            return "tr";
        case languages.Ukrainian:
            return "uk";
        case languages.Urdu:
            return "ur";
        case languages.Vietnamese:
            return "vi";
    }
}