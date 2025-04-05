import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StoryCircle } from './StoryCircle';
import { User } from '@/types/feed';
import { colors } from '@/constants/colors';

interface StoriesBarProps {
  users: User[];
  currentUser: {
    username: string;
    avatar: string;
  };
}

export const StoriesBar: React.FC<StoriesBarProps> = ({ users, currentUser }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <StoryCircle 
          uri={currentUser.avatar} 
          username={currentUser.username} 
          isUser={true} 
        />
        
        {users.map((user) => (
          <StoryCircle 
            key={user.id} 
            uri={user.avatar} 
            username={user.username} 
          />
        ))}
      </ScrollView>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
});