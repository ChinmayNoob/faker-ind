import { ZodError } from "zod";
import { Language } from "@/types/language";
import { fakerIndOptsSchema, type FakerIndOpts } from "@/schema";
import { Random } from "@/random";
import { Account } from "@/account";
import { Phone } from "@/phone";
import { Name } from "@/name";
import { Lorem } from "@/lorem";

class FakerInd {
    private language: Language;

    public random: Random;
    public account: Account;
    public phone: Phone;
    public name: Name;
    public lorem: Lorem;

    constructor(opts: FakerIndOpts) {
        try {
            fakerIndOptsSchema.parse(opts);
            this.language = opts.language ?? Language.ENGLISH;
            this.random = new Random();
            this.account = new Account(this.random);
            this.phone = new Phone(this.random);
            this.name = new Name(this.language, this.random);
            this.lorem = new Lorem(this.language, this.random);
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const [firstError] = err.errors;
                throw new Error(`Invalid options: ${firstError.message}`);
            }
            throw err;
        }
    }

    setLanguage(language: Language) {
        this.language = language;
    }

}

export { FakerInd, Language };









