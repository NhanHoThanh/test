import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { commonStyles } from '@/styles/common';

interface PostFooterProps {
  caption: string;
  hashtags: string[];
  username: string;
  likes: number;
  commentsCount: number;
  timestamp: number;
  isLiked: boolean;
  isSaved: boolean;
  onLikePress: () => void;
  onSavePress: () => void;
}

export const PostFooter: React.FC<PostFooterProps> = ({
  caption,
  hashtags,
  username,
  likes,
  commentsCount,
  timestamp,
  isLiked,
  isSaved,
  onLikePress,
  onSavePress,
}) => {
  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const formatCaption = (caption: string, hashtags: string[]) => {
    let formattedCaption = caption;
    
    // Add hashtags to the caption
    if (hashtags.length > 0) {
      formattedCaption += ' ';
      formattedCaption += hashtags.map(tag => `#${tag}`).join(' ');
    }
    
    return formattedCaption;
  };

  const renderCaption = () => {
    const formattedCaption = formatCaption(caption, hashtags);
    
    return (
      <Text style={styles.caption}>
        <Text style={styles.username}>{username}</Text>{' '}
        {formattedCaption.split(' ').map((word, index) => {
          if (word.startsWith('#')) {
            return (
              <Text key={index} style={styles.hashtag}>
                {word}{' '}
              </Text>
            );
          }
          return word + ' ';
        })}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={onLikePress} style={commonStyles.iconButton}>
            <Heart 
              size={24} 
              color={isLiked ? colors.red : colors.text} 
              fill={isLiked ? colors.red : colors.transparent} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.iconButton}>
            <MessageCircle size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.iconButton}>
            <Send size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSavePress}>
          <Bookmark 
            size={24} 
            color={colors.text} 
            fill={isSaved ? colors.text : colors.transparent} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.likesContainer}>
        <Text style={styles.likes}>{likes.toLocaleString()} likes</Text>
      </View>
      
      <View style={styles.captionContainer}>
        {renderCaption()}
      </View>
      
      {commentsCount > 0 && (
        <TouchableOpacity style={styles.commentsLink}>
          <Text style={styles.commentsText}>
            View all {commentsCount} comments
          </Text>
        </TouchableOpacity>
      )}
      
      <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  likesContainer: {
    marginBottom: 6,
  },
  likes: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text,
  },
  captionContainer: {
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  username: {
    fontWeight: '600',
  },
  hashtag: {
    color: colors.primary,
  },
  commentsLink: {
    marginBottom: 4,
  },
  commentsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
});