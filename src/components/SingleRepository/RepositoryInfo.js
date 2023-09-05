import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Text from "../TextComponents/Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "column",
    borderBottomWidth: 10,
    borderBottomColor: theme.colors.backgroundSecondary,
    padding: 10,
  },
  container: {
    flexDirection: "row",
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
    alignSelf: "flex-start",
  },
  languageText: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textWhite,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  stat: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textWhite,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  } else {
    return count;
  }
};

const RepositoryInfo = ({ repository }) => {
  const openGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.topContainer}>
      <View testID="repository-item" style={styles.container}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.details}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>{repository.language}</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text fontSize="subheading" fontWeight="bold">
                {formatCount(repository.forksCount)}
              </Text>
              <Text style={styles.statLabel}>Forks</Text>
            </View>
            <View style={styles.stat}>
              <Text fontSize="subheading" fontWeight="bold">
                {formatCount(repository.stargazersCount)}
              </Text>
              <Text style={styles.statLabel}>Stars</Text>
            </View>
            <View style={styles.stat}>
              <Text fontSize="subheading" fontWeight="bold">
                {repository.ratingAverage}
              </Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.stat}>
              <Text fontSize="subheading" fontWeight="bold">
                {repository.reviewCount}
              </Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.githubButton} onPress={openGitHub}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RepositoryInfo;
