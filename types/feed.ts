export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  isVerified: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface Post {
  id: string;
  user: User;
  images: string[];
  caption: string;
  hashtags: string[];
  likes: number;
  comments: Comment[];
  timestamp: number;
  location?: string;
  isLiked: boolean;
  isSaved: boolean;
}