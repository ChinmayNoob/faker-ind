import { LocalPerson } from "@/languages";
import { Random } from "@/random";
import { Gender } from "@/types/gender";
import { femaleFirstNames, lastNames, maleFirstNames, prefix } from "@/languages/hindi/names";
import { phrases, words } from "@/languages/hindi/words";

class HindiLocals implements LocalPerson{
    private random :Random;
    constructor(random:Random){
        this.random = random;
    }

    public firstName(gender: Gender):string{
        return this.random.arrayElement(
            gender===Gender.MALE? maleFirstNames:femaleFirstNames,
        )as string;
    }

    public lastName():string{
        return this.random.arrayElement(lastNames)as string;
    }

    public prefix():string{
        return this.random.arrayElement(prefix)as string;
    }

    public word():string{
        return this.random.arrayElement(words)as string;
    }

    public phrase():string{
        return this.random.arrayElement(phrases)as string;
    }

}


export { HindiLocals };