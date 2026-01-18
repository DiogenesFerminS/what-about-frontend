export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface FollowStats {
  followers: number;
  following: number;
}

export interface IsFollowedResponse {
  isFollowed: boolean;
}

export interface FollowResponse {
  success: boolean;
}