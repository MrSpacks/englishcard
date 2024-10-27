import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { WordsProvider } from "../context/WordsContext"; // Проверьте правильность пути
import { Slot } from "expo-router";

export default function TabLayout() {
  return (
    <WordsProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#325AFF",
          headerStyle: {
            backgroundColor: "#1E1E1E",
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#1E1E1E",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: "Learn",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={25}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: "Add",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                name={focused ? "pluscircleo" : "plus"}
                size={25}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </WordsProvider>
  );
}
