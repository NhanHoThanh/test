import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  StatusBar, 
  Platform 
} from 'react-native';
import { Post } from '@/components/Post';
import { StoriesBar } from '@/components/StoriesBar';
import { InstagramLogo } from '@/components/InstagramLogo';
import { useFeedStore } from '@/store/feed-store';
import { colors } from '@/constants/colors';
import { Camera, Send } from 'lucide-react-native';

export default function FeedScreen() {
  const { posts, toggleLike, toggleSave } = useFeedStore();
  
  // Extract unique users for stories
  const uniqueUsers = Array.from(
    new Map(posts.map(post => [post.user.id, post.user])).values()
  );
  
  // Current user (first user for demo)
  const currentUser = {
    username: 'yourusername',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <InstagramLogo />
      </View>
      <View style={styles.headerIcons}>
        <Camera size={24} color={colors.text} style={styles.icon} />
        <Send size={24} color={colors.text} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post 
            post={item} 
            onLikePress={toggleLike} 
            onSavePress={toggleSave} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {renderHeader()}
            <StoriesBar users={uniqueUsers} currentUser={currentUser} />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
});