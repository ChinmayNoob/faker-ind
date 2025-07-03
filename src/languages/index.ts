import { Gender } from "@/types/gender";

export type LocalPerson = {
    firstName(gender: Gender): string;
    lastName(): string;
    prefix(): string;
    word(): string;
    phrase(): string;
}