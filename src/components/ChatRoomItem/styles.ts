import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 10 },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  rightContainer: { flex: 1, justifyContent: "center" },
  badgeContainer: {
    position: "absolute",
    top: 10,
    left: 45,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#3777f0",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 12, color: "white" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { color: "grey" },

  name: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 3,
  },
});
export default styles;
