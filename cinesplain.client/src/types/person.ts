import CastMember from "./castMember.ts";
import CrewMember from "./crewMember.ts";
import Image from "./image.ts";

type Person = {
    adult: boolean;
    alsoKnownAs: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdbId: string;
    knownForDepartment: string;
    name: string;
    placeOfBirth: string | null;
    popularity: number;
    profilePath: string | null;
    images: {
        profiles: Image[] | null;
    };
    movieCredits: {
        cast: CastMember[] | null;
        crew: CrewMember[] | null;
    };
};

export default Person;