import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function FloatingNavBar() {
  return (
    <View style={styles.caixaNav}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navHover}>
            <Feather name="home" size={22} color={"#fffffeff"} />
            <Text style={styles.navHoverP}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcone}>
            <Feather name="book" size={24} color="#A2C9E4" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcone}>
            <Feather name="award" size={24} color="#A2C9E4" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcone}>
            <Feather name="users" size={24} color="#A2C9E4" />
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  caixaNav: {
    position: "absolute",
    bottom: 24,
    left: 22,
    right: 22,
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#fffffeff",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10, // parte de sombra complexa que nao decoro nunca, mas funciona
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  navHover: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E6BA8",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 9,
  },
  navHoverP: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: "#fffffeff",
    marginLeft: 8,
  },
  navIcone: {}, // vazio por enquanto
});
