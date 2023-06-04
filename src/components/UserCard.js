import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

import { DarkMode } from "./DarkModeTheme";

export default function UserCard({ item, navigation }) {
  const theme = useSelector((state) => state.usersData.darkMode);

  return (
    <Pressable
      style={[
        styles.Container,
        theme && { backgroundColor: DarkMode.BACKGROUND_COLOR },
      ]}
      onPress={() =>
        navigation.navigate("Profile", {
          name: item.item.name.first,
          lastName: item.item.name.last,
          image: item.item.picture.large,
          email: item.item.email,
          age: item.item.dob.age,
          gender: item.item.gender,
          country: item.item.location.country,
          phone: item.item.phone,
        })
      }
    >
      <Image source={{ uri: item.item.picture.large }} style={styles.Image} />
      <View style={styles.Body}>
        <Text style={[styles.text, theme && { color: "white" }]}>
          {item.item.name.first} {item.item.name.last}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 8,
  },
  Body: {
    justifyContent: "center",
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    gap: 5,
  },
});
