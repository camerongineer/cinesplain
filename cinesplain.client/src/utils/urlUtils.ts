export const toggleParams = (prevSearch: Record<string, string | undefined> | undefined, key: string) => {
    const updatedSearchParams: Record<string, string | undefined> = { ...(prevSearch ?? {}) };
    if (updatedSearchParams[key]) {
        delete updatedSearchParams[key];
    } else {
        updatedSearchParams[key] = "true";
    }
    return updatedSearchParams;
};
