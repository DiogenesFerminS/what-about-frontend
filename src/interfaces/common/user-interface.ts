export interface User {
    id:                 string;
    email:              string;
    username:           string;
    name:               string;
    bio:                string;
    avatarUrl:          null;
    location:           string;
    isVerified:         boolean;
    isActive:           boolean;
    verifyToken:        null;
    resetPasswordToken: null;
    createdAt:          Date;
    updatedAt:          Date;
}
