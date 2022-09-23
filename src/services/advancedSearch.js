import { languages } from "../components/search/subcomponents/language_menu";
import { Months } from "../components/search/subcomponents/startDate";
import { useFetch } from "../misc/useFetch";

export function doAdvancedSearch(advancedSearchBody, setLoading) {
    useFetch(
        "http://127.0.0.1:8081/tweets/search", 
        "POST", 
        "1546282785752551426-Z6wecftUZNlF5VTqePnYTWlppvz0xT", 
        "95W4P9j0tkJJsKYrbGRRh3fXRO1KSwwTTIherhdhS8lBx", 
        advancedSearchBody, 
        setLoading
    )
}




// Data cleaning / formatting functions

export function formatAdvancedSearchBody(allWords, exactPhrase, anyWords, noneWords, hashtags, fromAccounts, toAccounts, mentioningAccounts, minReplies, minFaves, minRetweets, language, startDay, startMonth, startYear, endDay, endMonth, endYear, showReplies, showRepliesOnly, showLinks, showLinksOnly){
    
    const anyWordsFinal = splitStringToArr(anyWords);
    const noneWordsFinal = splitStringToArr(noneWords);
    const hashtagsFinal = splitStringToArr(hashtags);
    const fromAccountsFinal = splitStringToArr(removeAtFromString(fromAccounts));
    const toAccountsFinal = splitStringToArr(removeAtFromString(toAccounts));
    const mentioningAccountsFinal = splitStringToArr(removeAtFromString(mentioningAccounts));
    const languageFinal = convertLanguageTo2CharCode(language);
    const startDateFinal = convertDayMonthYearFinal(startDay, startMonth, startYear);
    const endDateFinal = convertDayMonthYearFinal(endDay, endMonth, endYear);

    return {
        all_words_query : allWords,
        exact_phrase : exactPhrase,
        any_of_these_words : anyWordsFinal,
        none_of_these_words : noneWordsFinal,
        hashtags: hashtagsFinal,
        from_accounts: fromAccountsFinal,
        to_accounts: toAccountsFinal,
        mentioning_accounts: mentioningAccountsFinal,
        min_replies: minReplies,
        min_faves: minFaves,
        min_retweets: minRetweets,
        language: languageFinal,
        to_date: startDateFinal,
        from_date: endDateFinal,
        show_replies: showReplies,
        show_replies_only: showRepliesOnly,
        show_links: showLinks,
        show_links_only: showLinksOnly
    }

}

export function splitStringToArr(str){
    if(str.trim() != ""){
        return str.trim().split(/\s+/);
    }
    return [];
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

export function convertMonthToNum(month){
    switch(month){
        case Months.Month:
            return "Month";
        case Months.January:
            return 1;
        case Months.February:
            return 2;
        case Months.March:
            return 3;
        case Months.April:
            return 4;
        case Months.May:
            return 5;
        case Months.June:
            return 6;
        case Months.July:
            return 7;
        case Months.August:
            return 8;
        case Months.September:
            return 9;
        case Months.October:
            return 10;
        case Months.November:
            return 11;
        case Months.December:
            return 12;
    }
}

export function convertDayMonthYearFinal(day, month, year){
    const monthFinal = convertMonthToNum(month);
    if (day != "Day" && monthFinal != "Month" && year != "Year"){
        return year + "-" + monthFinal + "-" + day;
    }
    return "";
}