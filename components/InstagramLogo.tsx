import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';

interface InstagramLogoProps {
  width?: number;
  height?: number;
}

export const InstagramLogo: React.FC<InstagramLogoProps> = ({ 
  width = 110, 
  height = 30 
}) => {
  return (
    <View style={styles.container}>
      <Image
        source="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
        style={[styles.logo, { width, height }]}
        contentFit="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  logo: {
    backgroundColor: colors.transparent,
  },
});