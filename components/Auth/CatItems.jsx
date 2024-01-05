import { View, Text, FlatList, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { colors, fontsize } from "../../constants/theme";

export default function CatItems({ item }) {
  const catItems = [
    {
      name: "Entertainment",
      icon: "television-play",
    },
    {
      name: "Food",
      icon: "food-fork-drink",
    },
    {
      name: "Groceries",
      icon: "shopping-outline",
    },
  ];

  function Cat({ item }) {
    return (
      <View style={styles.itemsContainer}>
        <View style={styles.itemContent}>
          <View style={styles.itemIconContainer}>
            <MaterialCommunityIcons
              name={item.icon}
              size={32}
              color={colors.primary}
            />
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
        <View style={styles.deleteIconContainer}>
          <MaterialCommunityIcons
            name="delete"
            size={28}
            color={colors.lightRed}
          />
        </View>
      </View>
    );
  }

  function CatWithTransactions({ item }) {
    console.log(item);
    const iconName =
      item.name === "Food"
        ? "food"
        : item.name === "Groceries"
        ? "shopping-outline"
        : "television-play";
    return (
      <View style={styles.itemsContainer}>
        <View style={styles.itemContent}>
          <View style={styles.itemIconContainer}>
            <MaterialCommunityIcons
              name={iconName}
              size={32}
              color={colors.primary}
            />
          </View>
          <View style={styles.itemContentInfo}>
            <View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemAmount}>{item.amount}</Text>
            </View>
            <View>
              <Text style={styles.itemAmount}>{item.date}</Text>
              <Text style={styles.itemAmount}>{item.desc}</Text>
            </View>
          </View>
        </View>
        <View style={styles.deleteIconContainer}>
          <MaterialCommunityIcons
            name="delete"
            size={28}
            color={colors.lightRed}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.catContainer}>
      {item ? (
        <FlatList
          style={{ marginTop: 10 }}
          data={item}
          keyExtractor={(item) => item.name + Math.random()}
          renderItem={(item) => <CatWithTransactions item={item.item} />}
        />
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          data={catItems}
          keyExtractor={(item) => item.name}
          renderItem={(item) => <Cat item={item.item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  catContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.primaryLightGreyHex,
    margin: 10,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  itemContent: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 3,
  },
  itemIconContainer: {
    padding: 4,
  },
  itemContentInfo: {
    width: "80%",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "medium",
    color: colors.primaryWhiteHex,
    fontSize: fontsize.size_18,
  },
  itemAmount: {
    fontFamily: "regular",
    color: colors.primaryWhiteHex,
    fontSize: fontsize.size_16,
  },
});
