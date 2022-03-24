export interface UserAppI {
  email: string;
  urlProfilePic: string;
  id: string;
}
export interface UserContextI {
  user: null | UserAppI;
  setUser: (user: UserAppI) => void;
}

export interface DevitI {
  likesCount: number;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  }
  userId: string;
  avatar: string;
  sharedCount: number;
  content: string;
  id: string;
  email: string;
  normalizedDate: string;
}