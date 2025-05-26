import { VStack } from "@/components/ui/vstack";
import { Navbar } from "@/components/navbar";
import { Link, LinkText } from "@/components/ui/link";
import { router } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import {Button, ButtonText} from "@/components/ui/button";

export default function GameHomeScreen() {

const local = useLocalSearchParams();

const handleHomeRedirect = () => {
    router.replace("/");
}

const handleGameRedirect = () => {
    router.replace(`/gameRoom?gamemode=${local.gamemode}`);
}

  return (
    <VStack className="flex h-screen w-screen">
      <VStack className="h-full w-full" space="4xl">
        <Navbar />
        <VStack className="flex-1 justify-start w-full px-6" space={"2xl"}>
            <Link onPress={handleHomeRedirect} isExternal className="ml-1">
				<LinkText className="font-black text-rythmix-primary no-underline">Home</LinkText>
			</Link>
      <Button onPress={() => handleGameRedirect()} style={{ boxShadow: "0px 4px 4px 0px #00000025" }} size="lg" className="bg-rythmix-primary rounded-none">
        <ButtonText size="xl" className="uppercase font-black">Creer un groupe</ButtonText>
      </Button>
      <Button onPress={() => handleHomeRedirect()} style={{ boxShadow: "0px 4px 4px 0px #00000025" }} size="lg" className="bg-rythmix-primary rounded-none">
          <ButtonText size="xl" className="uppercase font-black">Rejoindre un groupe</ButtonText>
      </Button>

            
        </VStack>
      </VStack>
    </VStack>
  );
}