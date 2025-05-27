import { Text } from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {BorderContainer} from "@/components/ui/BorderContainer";
import {Heading} from "@/components/ui/heading";
import {Button, ButtonText} from "@/components/ui/button";
import {LinearGradient} from "expo-linear-gradient";
import {View} from "react-native";


export function GameModes() {
  return (
    <VStack space={"md"}>
        <Text className="font-black text-rythmix-white" size="4xl">
            Game modes
        </Text>
        <VStack space={"md"}>
          <LinearGradient
            colors={['white', '#FF2C00']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className={"p-[6px]"}
          >
            <LinearGradient
              colors={['#FF2C00', '#FF2C00', '#FFFFFF33', '#FF2C00']}
              locations={[0, 0.5, 1, 1]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0, y: 1.5 }}
              className={"flex-1 bg-rythmix-black"}
            >
            <VStack className="flex-1 px-4 py-10 items-center justify-center gap-6">
                <VStack className="items-center justify-center">
                    <Heading className="text-rythmix-white font-black uppercase pb-3" size="4xl">Track wars</Heading>
                    <Text className={"text-rythmix-white w-56 text-center font-medium text-xl"} numberOfLines={3} style={{ lineHeight: 20, height: 60 }}>
                      Un thème, une track, et un vote pour le celui à la meilleure playlist !
                    </Text>
                </VStack>
              <View style={{ boxShadow: "0px 4px 4px 0px #00000025" }} className={"w-4/5"}>
                <LinearGradient
                  className="h-[60px]"
                  colors={["#FF2C00","#FE63FF", "#9899FF"]}
                  start={[0, 1]}
                  end={[1, 0]}
                >
                  <Button className="text-rythmix-dark bg-transparent justify-center items-center h-full uppercase font-black">
                    <ButtonText className="uppercase text-4xl font-black">Start</ButtonText>
                  </Button>
                </LinearGradient>
              </View>
            </VStack>
            </LinearGradient>
          </LinearGradient>
          <LinearGradient
            colors={['white', '#9899FF']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className={"p-[6px]"}
          >
            <LinearGradient
              colors={['#9899FF', '#9899FF', '#FFFFFF33', '#9899FF']}
              locations={[0, 0.2, 0.8, 1]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.5, y: 0.8 }}
              className={"flex-1 bg-rythmix-black"}
            >
              <VStack className="flex-1 px-4 py-10 items-center justify-center gap-6">
                <VStack className="items-center justify-center">
                  <Heading className="text-rythmix-white font-black uppercase pb-3" size="4xl">Blindrythm</Heading>
                  <Text className={"text-rythmix-white w-56 text-center font-medium text-xl"} numberOfLines={3} style={{ lineHeight: 20, height: 60 }}>
                    Un thème, une track, et un vote pour le celui à la meilleure playlist !
                  </Text>
                </VStack>
                <View style={{ boxShadow: "0px 4px 4px 0px #00000025" }} className={"w-4/5"}>
                  <LinearGradient
                    className="h-[60px]"
                    colors={["#FF2C00","#FE63FF", "#9899FF"]}
                    start={[0, 1]}
                    end={[1, 0]}
                  >
                    <Button className="text-rythmix-dark bg-transparent justify-center items-center h-full uppercase font-black">
                      <ButtonText className="uppercase text-4xl font-black">Start</ButtonText>
                    </Button>
                  </LinearGradient>
                </View>
              </VStack>
            </LinearGradient>
          </LinearGradient>
        </VStack>
    </VStack>
  );
}