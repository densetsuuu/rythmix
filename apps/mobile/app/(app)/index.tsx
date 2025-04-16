import { VStack } from "@/components/ui/vstack";
import { Navbar } from "@/components/navbar";
import { FriendsInsight } from "@/components/friends-insight";
import {GameModes} from "@/components/GameModes";
import {Stats} from "@/components/Stats";

export default function HomeScreen() {
  return (
    <VStack className="flex h-screen w-screen">
      <VStack className="h-full w-full" space="4xl">
        <Navbar />
        <VStack className="flex-1 justify-start w-full px-6" space={"2xl"}>
          <FriendsInsight />
          <GameModes />
          <Stats />
        </VStack>
      </VStack>
    </VStack>
  );
}
