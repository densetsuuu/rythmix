import { VStack } from "@/components/ui/vstack";
import { Navbar } from "@/components/navbar";
import { Link, LinkText } from "@/components/ui/link";
import { router } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import {Button, ButtonText} from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { useEffect, useState } from "react";

export default function GameRoom() {

const handleHomeRedirect = () => {
    router.replace("/");
}
const local = useLocalSearchParams();
const rawGamemode = local.gamemode;
const gameMode = Array.isArray(rawGamemode) ? rawGamemode[0] : rawGamemode;
const [gameModeState, setGameMode] = useState(gameMode);

  return (
    <VStack className="flex h-screen w-screen">
      <VStack className="h-full w-full" space="4xl">
        <Navbar />
        <VStack className="flex-1 justify-start w-full px-6" space={"2xl"}>
          <Link onPress={handleHomeRedirect} isExternal className="ml-1">
              <LinkText className="font-black text-rythmix-primary no-underline">Home</LinkText>
          </Link>
          <Text>codedelaroom</Text>
          <Select onValueChange={(val:string) => setGameMode(val)} selectedValue={gameModeState}>
            <SelectTrigger className="border border-gray-300 rounded px-3 py-2">
              <SelectInput placeholder="Choisissez une option" />
              <SelectIcon as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent className="bg-white border rounded">
                <SelectItem label="TrackWars" value="TrackWars" />
                <SelectItem label="BlindRythm" value="BlindRythm" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </VStack>
      </VStack>
    </VStack>
  );
}