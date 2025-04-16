import { Text } from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {BorderContainer} from "@/components/ui/BorderContainer";
import {Heading} from "@/components/ui/heading";
import {Button, ButtonText} from "@/components/ui/button";


export function GameModes() {
  return (
    <VStack space={"md"}>
        <Text className="font-black text-black" size="3xl">
            Game modes
        </Text>
        <HStack space={"md"}>
            <BorderContainer className="flex-1 px-4 py-10 items-center justify-center gap-6">
                <VStack className="items-center justify-center">
                    <Heading className="text-rythmix-primary font-black" size="xl">Theme</Heading>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    </Text>
                </VStack>
                <Button style={{ boxShadow: "0px 4px 4px 0px #00000025" }} size="lg" className="bg-rythmix-primary rounded-none">
                    <ButtonText size="xl" className="uppercase font-black">Start</ButtonText>
                </Button>
            </BorderContainer>
            <BorderContainer className="flex-1 px-4 py-10 items-center justify-center gap-6">
                <VStack className="items-center justify-center">
                    <Heading className="text-rythmix-secondary font-black" size="xl">BlindPlaylist</Heading>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    </Text>
                </VStack>
                <Button size="lg" style={{ boxShadow: "0px 4px 4px 0px #00000025" }} className="bg-rythmix-secondary rounded-none">
                    <ButtonText size="xl" className="uppercase font-black">Start</ButtonText>
                </Button>
            </BorderContainer>
        </HStack>
    </VStack>
  );
}