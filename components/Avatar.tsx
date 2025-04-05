import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface AvatarProps {
  uri: string;
  size?: number;
  hasStory?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  uri, 
  size = 32, 
  hasStory = false 
}) => {
  return (
    <View style={[
      styles.container,
      hasStory && styles.storyRing,
      { width: size + (hasStory ? 6 : 0), height: size + (hasStory ? 6 : 0) }
    ]}>
      <Image 
        source={{ uri }} 
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.lightGray,
  },
  storyRing: {
    padding: 3,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
});