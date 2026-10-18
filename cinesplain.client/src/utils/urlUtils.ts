export const toggleParams = (prevSearchParams: URLSearchParams, key: string) => {
    const updatedSearchParams = new URLSearchParams(prevSearchParams);
    if (updatedSearchParams.get(key)) {
        updatedSearchParams.delete(key);
    } else {
        updatedSearchParams.set(key, "true");
    }
    return updatedSearchParams;
};
