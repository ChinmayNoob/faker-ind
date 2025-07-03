import { LocalPerson } from "@/languages";
import { arrayElement } from "@/random";
import { Gender } from "@/types/gender";
import { femaleFirstNames, lastNames, maleFirstNames, prefix } from "@/languages/urdu/names";
import { phrases, words } from "@/languages/urdu/words";

function urduLocals(): LocalPerson {
    return {
        firstName(gender: Gender): string {
            return arrayElement(
                gender === Gender.MALE ? maleFirstNames : femaleFirstNames,
            ) as string;
        },

        lastName(): string {
            return arrayElement(lastNames) as string;
        },

        prefix(): string {
            return arrayElement(prefix) as string;
        },

        word(): string {
            return arrayElement(words) as string;
        },

        phrase(): string {
            return arrayElement(phrases) as string;
        }
    };
}

export { urduLocals };           