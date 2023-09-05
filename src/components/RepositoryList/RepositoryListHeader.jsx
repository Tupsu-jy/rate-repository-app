import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Menu, Button } from "react-native-paper";
import RepositorySearchBar from "./RepositorySearchBar";
import Text from "../TextComponents/Text";
import { ORDER_BY } from "../../utils/orderByOptions";
import theme from "../../theme";
import { RepositoryFilterContext } from "./contexts";

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  button: {
    width: Dimensions.get("window").width,
    borderWidth: 0,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 0,
  },
});

const ORDER_TEXT_MAP = {
  [ORDER_BY.LATEST]: "Order by latest repositories",
  [ORDER_BY.TOP_RATED]: "Order by top rated repositories",
  [ORDER_BY.LOWEST_RATED]: "Order by lowest rated repositories",
};

const RepositoryListHeader = () => {
  const { orderBy, setOrderBy } = useContext(RepositoryFilterContext);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const onValueChange = (value) => {
    setOrderBy(value); // <-- Update using context's setOrderBy
  };

  return (
    <View style={styles.container}>
      <RepositorySearchBar />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button style={styles.button} onPress={openMenu} mode="outlined">
            <Text fontWeight="bold" color="textPrimary">
              {ORDER_TEXT_MAP[orderBy] || ORDER_TEXT_MAP[ORDER_BY.LATEST]}
            </Text>
          </Button>
        }
      >
        {Object.entries(ORDER_TEXT_MAP).map(([key, value]) => (
          <Menu.Item
            key={key}
            title={value}
            onPress={() => {
              onValueChange(key);
              closeMenu();
            }}
          />
        ))}
      </Menu>
    </View>
  );
};

export default RepositoryListHeader;
