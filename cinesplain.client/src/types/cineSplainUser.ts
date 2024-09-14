import Favorite from "./favorite";

type CineSplainUser = {
    email: string,
    firstName: string,
    lastName: string,
    favorites: Favorite[],
};

export default CineSplainUser;