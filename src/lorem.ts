import type { LocalPerson } from "@/languages";
import { hindiLocals } from "@/languages/hindi";
import { Language } from "@/types/language";
import { englishLocals } from "@/languages/english";

function getLocalPerson(language: Language): LocalPerson {
    switch (language) {
        case "Hindi":
            return hindiLocals();
        case "English":
            return englishLocals();
        default:
            throw new Error(`Language "${language}" not supported`);
    }
}

export function word(language: Language): string {
    const localPerson = getLocalPerson(language);
    return localPerson.word();
}

export function phrase(language: Language): string {
    const localPerson = getLocalPerson(language);
    return localPerson.phrase();
}
