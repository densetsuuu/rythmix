import useAuthStore from "@/components/providers/auth-provider";
import { Redirect, Tabs } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import {ImageBackground, SafeAreaView, View} from "react-native";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import {colorScheme} from "nativewind";

export default function AppLayout() {
  const { me } = useAuthStore();


  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: me,
  });

  // Optionnel : écran de chargement pendant le fetch
  // if (isLoading) {
  //   return (
  //     <Center className="h-screen">
  //       <Spinner size="large" />
  //     </Center>
  //   );
  // }

  if (!user && !isLoading) {
    return <Redirect href="/register" />;
  }

  colorScheme.set("dark")
  console.log(colorScheme.get())
  const tabs = [
    {
      name: "index",
      label: "Home",
      icon: require("../../assets/images/home-logo.png"),
    },
    {
      name: "(profile)/profile",
      label: "Profile",
      icon: require("../../assets/images/profile-logo.png"),
    },
    {
      name: "(friends)/friends",
      label: "Friends",
      icon: require("../../assets/images/friends-logo.png"),
    },
    {
      name: "(profile)/editProfile",
      label: "Stats",
      icon: require("../../assets/images/stats-logo.png"),
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: "black",
          boxShadow: "0px -8px 25px 10px #FF2C0099"
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{marginTop: 32, alignItems: "center", justifyContent: "center", width: 50, height: 90, overflow: "visible"
              }}>
                <View style={{ width: 36, height: 36 }}>
                  <Image
                    source={tab.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: focused ? "900" : "normal",
                    color: focused ? "#FFF" : "#EEE",
                    marginTop: 20,
                  }}
                >
                  {tab.label}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
