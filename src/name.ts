import type { LocalPerson } from "@/languages";
import { englishLocals } from "@/languages/english";
import { hindiLocals } from "@/languages/hindi";
import { boolean } from "@/random";
import { Gender } from "@/types/gender";
import { Language } from "@/types/language";
import { bengaliLocals } from "./languages/bengali";
import { tamilLocals } from "./languages/tamil";
import { teleguLocals } from "./languages/telegu";
import { marathiLocals } from "./languages/marathi";
import { gujaratiLocals } from "./languages/gujarati";
import { kannadaLocals } from "./languages/kannada";
import { malayalamLocals } from "./languages/malayalam";
import { urduLocals } from "./languages/urdu";
import { punjabiLocals } from "./languages/punjabi";

function getLocalPerson(language: Language): LocalPerson {
    switch (language) {
        case "Hindi":
            return hindiLocals();
        case "English":
            return englishLocals();
        case "Bengali":
            return bengaliLocals();
        case "Tamil":
            return tamilLocals();
        case "Telugu":
            return teleguLocals();
        case "Marathi":
            return marathiLocals();
        case "Gujarati":
            return gujaratiLocals();
        case "Kannada":
            return kannadaLocals();
        case "Malayalam":
            return malayalamLocals();
        case "Urdu":
            return urduLocals();
        case "Punjabi":
            return punjabiLocals();
        default:
            throw new Error(`Language "${language}" not supported`);
    }
}

function selectRandomGender(): Gender {
    return boolean() ? Gender.FEMALE : Gender.MALE;
}

/**
 * returns a single random first name based on the locale set
 *
 * @method firstName
 * @param {Language} language
 * @param {Enum} gender: Gender
 */
export function firstName(language: Language, gender?: Gender): string {
    const chosenGender = gender ?? selectRandomGender();
    const localPerson = getLocalPerson(language);
    return localPerson.firstName(chosenGender);
}

/**
 * returns a single random last name based on the locale set
 *
 * @method lastName
 * @param {Language} language
 */
export function lastName(language: Language): string {
    const localPerson = getLocalPerson(language);
    return localPerson.lastName();
}

/**
 * returns a name prefix depending on the locale set
 *
 * @method prefix
 * @param {Language} language
 */
export function prefix(language: Language): string {
    const localPerson = getLocalPerson(language);
    return localPerson.prefix();
}

/**
 * returns a random full name
 *
 * @method fullName
 * @param {Language} language
 */
export function fullName(language: Language): string {
    return `${prefix(language)} ${firstName(language)} ${lastName(language)}`;
}







