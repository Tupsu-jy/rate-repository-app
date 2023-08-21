import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  languageText: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textWhite,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  stat: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  } else {
    return count;
  }
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.details}>
        <Text fontSize="subheading" fontWeight="bold">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text fontSize="subheading" fontWeight="bold">{formatCount(item.forksCount)}</Text>
            <Text style={styles.statLabel}>Forks</Text>
          </View>
          <View style={styles.stat}>
            <Text fontSize="subheading" fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
            <Text style={styles.statLabel}>Stars</Text>
          </View>
          <View style={styles.stat}>
            <Text fontSize="subheading" fontWeight="bold">{item.ratingAverage}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.stat}>
            <Text fontSize="subheading" fontWeight="bold">{item.reviewCount}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
