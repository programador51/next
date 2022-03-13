export interface UserAppI {
    email: string;
    urlProfilePic: string;
}
export interface UserContextI {
    user: null | UserAppI;
    setUser: (user: UserAppI) => void
}