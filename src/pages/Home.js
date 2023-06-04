import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import axios from "axios";

import UserCard from "../components/UserCard";
import LoadingIndicator from "../components/LoadingIndicator";
import { DarkMode } from "../components/DarkModeTheme";

import { useSelector, useDispatch } from "react-redux";
import { AddUsers, FilterUsers, ChangeTheme } from "../redux/userSlice";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const users = useSelector((state) => state.usersData.users);
  const theme = useSelector((state) => state.usersData.darkMode);
  const dispatch = useDispatch();

  //Fetching users
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://randomuser.me/api/?results=15");
      dispatch(AddUsers(response.data.results));

      setIsLoading(false);
    } catch (error) {
      alert("Failed to fecth data, please check internet connection");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(FilterUsers(searchInput));
  }, [searchInput]);

  return (
    <SafeAreaView>
      <View
        style={[
          styles.Navbar,
          theme && { backgroundColor: DarkMode.NAV_BACKGROUND_COLOR },
        ]}
      >
        <View style={styles.Search}>
          <EvilIcons name="search" size={24} color="black" />
          <TextInput
            style={styles.SearchInput}
            placeholder="Search..."
            value={searchInput}
            onChangeText={(value) => setSearchInput(value)}
          />
        </View>
        <Pressable onPress={() => dispatch(ChangeTheme())}>
          {theme ? DarkMode.LIGHT_MODE : DarkMode.DarkModeIcon}
        </Pressable>
      </View>
      <View
        style={
          theme && {
            backgroundColor: DarkMode.BACKGROUND_COLOR,
            height: "100%",
          }
        }
      >
        <View>
          <FlatList
            keyExtractor={(item) => item.login.uuid}
            data={users}
            renderItem={(item) => (
              <UserCard item={item} navigation={navigation} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
          />
        </View>
        {isLoading && LoadingIndicator()}
        {users.length === 0 && searchInput.length > 0 && (
          <Text style={[styles.Text, theme && { color: DarkMode.WHITE_COLOR }]}>
            No matched results
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    width: "100%",
  },
  Search: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightgrey",
    padding: 5,
    borderRadius: 10,
    margin: 15,
  },
  SearchInput: {
    width: "85%",
  },
  Text: {
    marginLeft: 20,
    marginTop: 10,
  },
});
