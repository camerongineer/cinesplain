type UserInfo = {
    identityProvider: string;
    identityDetails: string | null;
    userDetails: string;
    userId: string;
    userRoles: string[];
}

export default UserInfo;