import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MoreHorizontal, MapPin } from 'lucide-react-native';
import { Avatar } from './Avatar';
import { User } from '@/types/feed';
import { colors } from '@/constants/colors';
import { commonStyles } from '@/styles/common';

interface PostHeaderProps {
  user: User;
  location?: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ user, location }) => {
  return (
    <View style={styles.container}>
      <View style={commonStyles.row}>
        <Avatar uri={user.avatar} size={36} hasStory={true} />
        <View style={styles.userInfo}>
          <View style={commonStyles.row}>
            <Text style={styles.username}>{user.username}</Text>
            {user.isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          {location && (
            <View style={[commonStyles.row, styles.locationContainer]}>
              <MapPin size={12} color={colors.textSecondary} />
              <Text style={styles.location}>{location}</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity>
        <MoreHorizontal size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text,
  },
  verifiedBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  verifiedText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: 'bold',
  },
  locationContainer: {
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 2,
  },
});