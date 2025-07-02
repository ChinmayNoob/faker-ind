import type { LocalPerson } from "./languages";
import { EnglishLocals } from "./languages/english";
import { HindiLocals } from "./languages/hindi";
import type { Random } from "./random";
import { Gender } from "./types/gender";
import { Language } from "./types/language";

export class Name {
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

    private selectRandomGender(): Gender {
        return this.random.boolean() ? Gender.FEMALE : Gender.MALE;
    }
    /**
 * returns a single random first name based on the locale set
 *
 * @method firstName
 * @param {Enum} gender: Gender
 */
    firstName(gender?: Gender): string {
        const chosenGender = gender ?? this.selectRandomGender();
        return this.localizer.firstName(chosenGender);
    }

    /**
     * returns a single random last name based on the locale set
     *
     * @method lastName
     */
    lastName(): string {
        return this.localizer.lastName();
    }

    /**
     * returns a name prefix depending on the locale set
     *
     * @method prefix
     */
    prefix(): string {
        return this.localizer.prefix();
    }

    /**
     * returns a random full name
     *
     * @method fullName
     */
    fullName(): string {
        return `${this.prefix()} ${this.firstName()} ${this.lastName()}`;
    }
}







