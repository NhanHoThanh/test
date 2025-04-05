import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from './Avatar';
import { colors } from '@/constants/colors';

interface StoryCircleProps {
  uri: string;
  username: string;
  isUser?: boolean;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({ 
  uri, 
  username, 
  isUser = false 
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Avatar 
        uri={uri} 
        size={60} 
        hasStory={!isUser} 
      />
      <Text 
        style={styles.username}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {isUser ? 'Your story' : username}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  username: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    color: colors.text,
  },
});