import Movie from "../types/movie.ts";
import Person from "../types/person.ts";

export const getFormattedDisplayedDate = (dateString: string | undefined) => {
    if (!dateString) {
        return "";
    }
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-us", {
        dateStyle: "long"
    });
    return formatter.format(date);
};

export const getFormattedCurrencyAmount = (dollarAmount: number) => {
    return dollarAmount.toLocaleString("en-us", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
};

export const getFormattedRuntime = (runtimeMinutes: number) => {
    const hours = Math.floor(runtimeMinutes / 60);
    const minutes = runtimeMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
};

export const getFormattedMovieLinkId = (movie: Movie) => {
    const formattedMovieTitle = formatLinkString(movie.title).substring(0, 75);
    return `${movie.id}-${formattedMovieTitle}`;
};

export const getFormattedPersonLinkId = (person: Person) => {
    const formattedPersonName = formatLinkString(person.name).substring(0, 75);
    return `${person.id}-${formattedPersonName}`;
};

export const getNumericId = (idString: string): number => {
    return Number(idString.match(/\d+/)?.[0]);
};

export const roundedToTenth = (num: number): number => {
    return Math.round(num * 10) / 10;
};

const formatLinkString = (input: string): string => {
    return input
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "_")
        .toLowerCase();
};
