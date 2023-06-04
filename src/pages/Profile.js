import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { DarkMode } from "../components/DarkModeTheme";

import { useSelector, useDispatch } from "react-redux";
import { ChangeTheme } from "../redux/userSlice";

export default function Profile({ route, navigation }) {
  //User details
  const { name, lastName, image, email, country, phone } = route.params;

  const theme = useSelector((state) => state.usersData.darkMode);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View>
        <View
          style={[
            styles.Navbar,
            theme && { backgroundColor: DarkMode.NAV_BACKGROUND_COLOR },
          ]}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={styles.arrow}
            onPress={() => navigation.navigate("Home")}
          />
          <Text
            style={[styles.Heading, theme && { color: DarkMode.WHITE_COLOR }]}
          >
            Profile
          </Text>

          <Pressable onPress={() => dispatch(ChangeTheme())}>
            {theme ? DarkMode.LIGHT_MODE : DarkMode.DarkModeIcon}
          </Pressable>
        </View>

        <View
          style={[
            styles.Body,
            theme && { backgroundColor: DarkMode.BACKGROUND_COLOR },
          ]}
        >
          <Image source={{ uri: image }} style={styles.Image} />

          <View
            style={[
              styles.TextWraper,
              theme && { borderColor: DarkMode.WHITE_COLOR },
            ]}
          >
            <AntDesign
              name="user"
              size={24}
              color={theme ? DarkMode.WHITE_COLOR : "black"}
            />
            <Text
              style={[
                styles.Text,
                theme && theme && { color: DarkMode.WHITE_COLOR },
              ]}
            >
              {name} {lastName}
            </Text>
          </View>
          <View
            style={[
              styles.TextWraper,
              theme && { borderColor: DarkMode.WHITE_COLOR },
            ]}
          >
            <MaterialIcons
              name="email"
              size={24}
              color={theme ? DarkMode.WHITE_COLOR : "black"}
            />
            <Text
              style={[
                styles.Text,
                theme && theme && { color: DarkMode.WHITE_COLOR },
              ]}
            >
              {email}
            </Text>
          </View>
          <View
            style={[
              styles.TextWraper,
              theme && { borderColor: DarkMode.WHITE_COLOR },
            ]}
          >
            <MaterialIcons
              name="phone"
              size={24}
              color={theme ? DarkMode.WHITE_COLOR : "black"}
            />
            <Text
              style={[
                styles.Text,
                theme && theme && { color: DarkMode.WHITE_COLOR },
              ]}
            >
              {phone}
            </Text>
          </View>
          <View
            style={[
              styles.TextWraper,
              theme && { borderColor: DarkMode.WHITE_COLOR },
            ]}
          >
            <FontAwesome5
              name="globe-africa"
              size={24}
              color={theme ? DarkMode.WHITE_COLOR : "black"}
            />
            <Text
              style={[
                styles.Text,
                theme && theme && { color: DarkMode.WHITE_COLOR },
              ]}
            >
              {country}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    marginTop: 20,
    fontSize: 30,
    fontWeight: "800",
    padding: 5,
  },

  Heading: {
    fontSize: 40,
    fontWeight: "700",
  },

  arrow: {
    marginLeft: 10,
    alignSelf: "center",
    backgroundColor: "black",
    color: "white",
    padding: 5,
    borderRadius: 25,
  },

  Body: {
    padding: 20,
    height: "100%",
  },

  Image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
  },

  TextWraper: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },

  Text: {
    fontSize: 15,
  },
});
