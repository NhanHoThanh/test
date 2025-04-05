import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  FlatList, 
  Image, 
  TouchableWithoutFeedback 
} from 'react-native';
import { colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

interface PostCarouselProps {
  images: string[];
  onDoubleTap: () => void;
}

export const PostCarousel: React.FC<PostCarouselProps> = ({ 
  images, 
  onDoubleTap 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastTap = useRef<number | null>(null);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      onDoubleTap();
      lastTap.current = null;
    } else {
      lastTap.current = now;
    }
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    if (slideIndex !== activeIndex) {
      setActiveIndex(slideIndex);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={handleTap}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
    backgroundColor: colors.lightGray,
  },
  image: {
    width,
    height: width,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
  },
});