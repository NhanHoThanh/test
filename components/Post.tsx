import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PostHeader } from './PostHeader';
import { PostCarousel } from './PostCarousel';
import { PostFooter } from './PostFooter';
import { LikeAnimation } from './LikeAnimation';
import { Post as PostType } from '@/types/feed';
import { colors } from '@/constants/colors';

interface PostProps {
  post: PostType;
  onLikePress: (postId: string) => void;
  onSavePress: (postId: string) => void;
}

export const Post: React.FC<PostProps> = ({ 
  post, 
  onLikePress, 
  onSavePress 
}) => {
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const handleDoubleTap = () => {
    if (!post.isLiked) {
      setShowLikeAnimation(true);
      onLikePress(post.id);
    }
  };

  return (
    <View style={styles.container}>
      <PostHeader user={post.user} location={post.location} />
      
      <View style={styles.imageContainer}>
        <PostCarousel 
          images={post.images} 
          onDoubleTap={handleDoubleTap} 
        />
        <LikeAnimation 
          visible={showLikeAnimation} 
          onAnimationEnd={() => setShowLikeAnimation(false)} 
        />
      </View>
      
      <PostFooter 
        caption={post.caption}
        hashtags={post.hashtags}
        username={post.user.username}
        likes={post.likes}
        commentsCount={post.comments.length}
        timestamp={post.timestamp}
        isLiked={post.isLiked}
        isSaved={post.isSaved}
        onLikePress={() => onLikePress(post.id)}
        onSavePress={() => onSavePress(post.id)}
      />
      
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  imageContainer: {
    position: 'relative',
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginTop: 8,
  },
});