export interface User {
    id:                 string;
    email:              string;
    username:           string;
    name:               string | null;
    bio:                string | null;
    avatarUrl:          string | null;
    location:           string | null;
    isVerified:         boolean;
    isActive:           boolean;
    verifyToken:        string | null;
    resetPasswordToken: string | null;
    createdAt:          Date;
    updatedAt:          Date;
}
