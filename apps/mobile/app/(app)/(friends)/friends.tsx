import GradientText from "@/components/GradientText";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import FriendSearchTab from "./FriendSearchTab";
import FriendsListTab from "./FriendsListTab";
import FriendRequestsTab from "./FriendRequestsTab";
import { View, ScrollView } from "react-native";
import { Navbar } from "@/components/navbar";

const tabs = ["Ajouter", "Amis", "Demandes"];

export default function FriendsScreen() {
  const [activeTab, setActiveTab] = useState("Ajouter");

  const renderContent = () => {
    switch (activeTab) {
      case "Ajouter":
        return <FriendSearchTab />;
      case "Demandes":
        return <FriendRequestsTab />;
      default:
        return <FriendsListTab />;
    }
  };

  return (
    <VStack  space={"md"}>

      <View className={"bg-blue-400 h-32"}>
          <Navbar />
      </View>

      <View className="flex-row justify-around py-4 pt-12">
        {tabs.map((tab) => (
          <Button
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`bg-transparent justify-center items-center h-full ${
              activeTab === tab ? "border-b-2 border-white" : ""
            }`}
          >
            <ButtonText className="text-rythmix-primary uppercase">
              {tab}
            </ButtonText>
          </Button>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }} className="px-4">
        {renderContent()}
      </ScrollView>

    </VStack>
  );
}
