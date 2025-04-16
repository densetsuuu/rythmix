import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {BorderContainer} from "@/components/ui/BorderContainer";
import {Progress, ProgressFilledTrack} from "@/components/ui/progress";
import {LinearGradient} from "@/components/LinearGradient";
import {View} from "react-native";
import GradientText from "@/components/GradientText";

export function Stats() {
    const progressValue = 90;

    return (
        <VStack space={"md"}>
            <HStack className="justify-between items-center">
                <Text className="font-black text-black" size="3xl">
                    Stats & trophies
                </Text>
                <Text className="uppercase tracking-normal text-rythmix-primary">Show all</Text>
            </HStack>
            <VStack space={"md"}>
                <BorderContainer className="px-4 py-8 justify-center gap-6">
                    <HStack className="items-center gap-4">
                        <Text className="font-extralight text-black" size="md">Level 4</Text>
                        <Progress value={progressValue} size="md" orientation="horizontal" className="flex-1">
                            <ProgressFilledTrack>
                                <View style={{ flex: 1, height: "100%", borderRadius: 4, overflow: "hidden" }}>
                                    {/* Gradient sur toute la barre */}
                                    <LinearGradient
                                        colors={["#FF2C00", "#FE63FF", "#9899FF"]}
                                        start={[0, 1]}
                                        end={[1, 0]}
                                        style={{ flex: 1 }}
                                        className="w-96"
                                    />
                                    <View style={{
                                        position: "absolute",
                                        left: `${progressValue}%`,
                                        right: 0,
                                        height: "100%",
                                        backgroundColor: "transparent",
                                    }} />
                                </View>
                            </ProgressFilledTrack>
                        </Progress>
                        <Text className="font-extralight text-black" size="md">Upper level</Text>
                    </HStack>
                </BorderContainer>
                <BorderContainer className="px-4 py-6 justify-center gap-6">
                    <HStack className="items-center justify-between gap-4">
                        <Text className="font-extralight text-black" size="md">You have unlocked a new trophy !</Text>
                            <GradientText
                              variant="primary"
                              className="font-black uppercase text-2xl"
                              shadow={true}
                            >
                                New !
                            </GradientText>
                    </HStack>
                </BorderContainer>
            </VStack>
        </VStack>
    );
}