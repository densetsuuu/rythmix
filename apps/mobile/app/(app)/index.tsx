import { VStack } from "@/components/ui/vstack";
import { Navbar } from "@/components/navbar";
import { FriendsInsight } from "@/components/friends-insight";
import {GameModes} from "@/components/GameModes";
import {Stats} from "@/components/Stats";
import {ImageBackground, SafeAreaView, ScrollView, View} from "react-native";
import {Header} from "@/components/header";

export default function HomeScreen() {
  return (
      <SafeAreaView className="h-full justify-between flex">
        <VStack className="w-full" space="4xl">
          <View className={"bg-blue-400 h-32"}>
            <Navbar />
          </View>
          <ScrollView className="w-full px-6 pt-6" contentContainerClassName={"justify-start pb-44"}>
            <FriendsInsight />
            <GameModes />
            <Stats />
          </ScrollView>
        </VStack>
      </SafeAreaView>
  );
}
