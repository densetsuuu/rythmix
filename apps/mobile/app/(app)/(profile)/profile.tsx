import useAuthStore from "@/components/providers/auth-provider";
import {VStack} from "@/components/ui/vstack";
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {Progress, ProgressFilledTrack} from "@/components/ui/progress";
import {Heading} from "@/components/ui/heading";
import {TouchableOpacity, View} from "react-native";
import {ChevronRightIcon, ExternalLinkIcon, Icon} from "@/components/ui/icon";
import {router} from "expo-router";
import {tuyau} from "@/constants/tuyau";
import {useQuery} from "@tanstack/react-query";
import {LinearGradient} from "@/components/LinearGradient";
import GradientText from "@/components/GradientText";
import {PencilLine} from "lucide-react-native";


export default function Profile() {
    const {user, logout} = useAuthStore();
    const handleReturn = () => {
        router.back()
    }

    const handleEditClick = () => {
        router.push('/editProfile')
    }

    const getCurrentTrack = async () => {
        return await tuyau.currentTrack.$get().unwrap();
    }

    const { } = useQuery({
        queryKey: ["currentTrack"],
        queryFn: getCurrentTrack
    });

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleDateString("fr-FR");
    };

    console.log(user?.createdAt)

    const progressValue = 50;
    return (
        <VStack className="h-screen w-screen bg-white mt-[-20]" style={{ boxShadow: "0px -4px 6px 2px #FF2C0025" }}>
            <TouchableOpacity
                onPress={handleReturn}
                className="absolute top-16 left-4 px-4 py-2 z-20"
            >
                <Text className="font-bold">← Retour</Text>
            </TouchableOpacity>
            <VStack className="items-center mt-4 h-full flex w-full" space="xl">
                {user ? (
                  <View className="relative">
                      <LinearGradient
                        className="rounded-full p-1"
                        colors={["#FF2C00", "#9899FF"]}
                        start={[0, 1]}
                        end={[1, 0]}
                      >
                          <Avatar size="2xl" className="p-[2px] bg-white">
                              <AvatarFallbackText>
                                  {user.username.toUpperCase()}
                              </AvatarFallbackText>
                              <AvatarImage source={{ uri: user.profile?.avatarUrl }} />
                          </Avatar>
                      </LinearGradient>

                      {/* Badge vert positionné en absolute */}
                      <View className="absolute bottom-1 right-1 w-8 h-8 bg-green-700 rounded-full border-2 border-white z-50" />
                  </View>
                ) : null}
                <VStack className="items-center" space="sm">
                    <Heading size={"4xl"} className="font-black text-black">
                        {user?.username}
                    </Heading>
                    <Text size="md">{user?.email}</Text>
                    <HStack className={"items-center gap-2"}>
                        <Text size="md">Lvl. 4</Text>
                        <Progress value={progressValue} size="md" orientation="horizontal" className="w-40">
                            <ProgressFilledTrack>
                                <View style={{ flex: 1, height: "100%", borderRadius: 4, overflow: "hidden" }}>
                                    {/* Gradient sur toute la barre */}
                                    <LinearGradient
                                        colors={["#FF2C00", "#FE63FF", "#9899FF"]}
                                        start={[0, 1]}
                                        end={[1, 0]}
                                        style={{ flex: 1 }}
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
                    </HStack>
                </VStack>
                <VStack className={"w-full gap-4 mt-4 px-6"}>
                    <Heading size={"md"} className={"pl-6 text-black font-black"}>About me</Heading>
                    { user?.description && (
                      <HStack className={"items-center px-4 py-6 bg-rythmix-primary/10 rounded-[30px]"}>
                          <Icon as={ChevronRightIcon} className="text-black font-light m-2 w-4 h-4"/>
                          <Text className="text-black font-light mr-2">{user?.description}</Text>
                      </HStack>
                    )}
                    <HStack className={"items-center px-4 py-6 bg-rythmix-primary/10 rounded-[30px]"}>
                        <Icon as={ChevronRightIcon} className="text-black font-light m-2 w-4 h-4"/>
                        <Text className="text-black font-light mr-2">Member since {formatDate(user?.createdAt!)}</Text>
                    </HStack>
                    <Heading size={"md"} className={"pl-6 text-black font-black"}>Profile management</Heading>
                    <View style={{ boxShadow: "0px 4px 4px 0px #00000025" }}>
                        <LinearGradient
                          className="gap-2"
                          colors={["#9899FF", "#FE63FF", "#FF2C00"]}
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 0 }}
                        >
                            <TouchableOpacity className="bg-white p-4 justify-center m-1 h-16" onPress={handleEditClick}>
                                <HStack className={"items-center justify-between"}>
                                    <GradientText block={true} variant="secondary" className="uppercase font-black text-xl">Edit my profile</GradientText>
                                    <PencilLine size={24} className="text-rythmix-secondary font-black" />
                                </HStack>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    <VStack style={{ boxShadow: "0px 4px 4px 0px #00000025" }} className={"border border-rythmix-primary bg-rythmix-primary"}>
                        <TouchableOpacity className={"h-16 bg-rythmix-primary p-4 justify-center m-1"} onPress={() => logout()}>
                            <HStack className={"items-center justify-between"}>
                                <Text className="uppercase text-white font-black text-xl">Sign out</Text>
                                <Icon as={ExternalLinkIcon} className="text-white font-black m-2 w-4 h-4"/>
                            </HStack>
                        </TouchableOpacity>
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    )
}

