import axios from "axios";

export const retrieveData = async (url: string) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    };
    return (await axios.get(url, options)).data;
};
