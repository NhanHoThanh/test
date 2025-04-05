import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/types/feed';
import { mockPosts } from '@/mocks/posts';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface FeedState {
  posts: Post[];
  isLoading: boolean;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set) => ({
      posts: mockPosts,
      isLoading: false,
      toggleLike: (postId: string) => {
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              const isLiked = !post.isLiked;
              return {
                ...post,
                isLiked,
                likes: isLiked ? post.likes + 1 : post.likes - 1,
              };
            }
            return post;
          }),
        }));
      },
      toggleSave: (postId: string) => {
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                isSaved: !post.isSaved,
              };
            }
            return post;
          }),
        }));
      },
    }),
    {
      name: 'feed-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);