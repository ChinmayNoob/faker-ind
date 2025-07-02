import type { LocalPerson } from "./languages";
import type { Random } from "./random";
import { HindiLocals } from "./languages/hindi";
import { Language } from "./types/language";
import { EnglishLocals } from "./languages/english";

export class Lorem {
    private language: Language;
    private random: Random;
    private localizer: LocalPerson;

    constructor(language: Language, random: Random) {
        this.language = language;
        this.random = random;
        this.localizer = this.setLocalizer();
    }

    private setLocalizer(): LocalPerson {
        switch (this.language) {
            case Language.HINDI:
                return new HindiLocals(this.random);
            case Language.ENGLISH:
                return new EnglishLocals(this.random);
            default:
                throw new Error(`Language "${this.language}" not supported`);
        }
    }

    word(): string {
        return this.localizer.word();
    }

    phrase(): string {
        return this.localizer.phrase();
    }
}
