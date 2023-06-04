import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function LoadingIndicator() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <ActivityIndicator size={"large"} color={"blue"} />
    </View>
  );
}
