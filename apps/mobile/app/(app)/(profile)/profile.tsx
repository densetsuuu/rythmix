import useAuthStore from "@/components/providers/auth-provider";
import {VStack} from "@/components/ui/vstack";
import {Avatar, AvatarBadge, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {Progress, ProgressFilledTrack} from "@/components/ui/progress";
import {Center} from "@/components/ui/center";
import {Heading} from "@/components/ui/heading";
import {Image, TouchableOpacity} from "react-native";
import {ChevronRightIcon, EditIcon, ExternalLinkIcon, Icon} from "@/components/ui/icon";
import {Divider} from "@/components/ui/divider";
import {router} from "expo-router";
import {tuyau} from "@/constants/tuyau";
import {useQuery} from "@tanstack/react-query";


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

    const {data: currentTrack, error} = useQuery({
        queryKey: ["currentTrack"],
        queryFn: getCurrentTrack
    });

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleDateString("fr-FR");
    };

    console.log(user?.createdAt)

    return (
        <VStack className="h-screen w-screen">
            <TouchableOpacity
                onPress={handleReturn}
                className="absolute top-16 left-4 px-4 py-2 z-20"
            >
                <Text className="font-bold">← Retour</Text>
            </TouchableOpacity>
            <VStack className="items-center mt-20 h-full flex w-full" space="xl">
                {user ? (
                    <Avatar size="2xl">
                        <AvatarFallbackText>
                            {user.username.toUpperCase()}
                        </AvatarFallbackText>
                        <AvatarImage source={{uri: user.profile?.avatarUrl}}/>
                        <AvatarBadge/>
                    </Avatar>
                ) : null}
                <VStack className="items-center" space="sm">
                    <Heading size={"4xl"}>
                        {user?.username}
                    </Heading>
                    <Text size="md">{user?.email}</Text>
                    <HStack className={"items-center gap-2"}>
                        <Text size="md">Lvl. 4</Text>
                        <Center className="w-[100px] h-[0px]">
                            <Progress value={40} size="md" orientation="horizontal">
                                <ProgressFilledTrack/>
                            </Progress>
                        </Center>
                    </HStack>
                </VStack>
                <VStack className={"w-full gap-4 mt-4 px-6"}>
                    <Heading size={"sm"} className={"pl-6"}>À propos de moi</Heading>
                    <VStack className={"bg-gray-100 p-4 gap-2 border border-gray-300 rounded-xl"}>
                        <VStack>
                            <HStack className={"items-center"}>
                                <Icon as={ChevronRightIcon} className="text-typography-500 m-2 w-4 h-4"/>
                                <Text>{user?.description}</Text>
                            </HStack>
                            <Divider className={"my-1"}/>
                            <HStack className={"items-center"}>
                                <Icon as={ChevronRightIcon} className="text-typography-500 m-2 w-4 h-4"/>
                                <Text>Membre depuis le {formatDate(user?.createdAt!)}</Text>
                            </HStack>
                            <Divider className={"my-1"}/>
                            <VStack space={"md"}>
                                <HStack className={"items-center"}>
                                    <Icon as={ChevronRightIcon} className="text-typography-500 m-2 w-4 h-4"/>
                                    <Text>Musique préférée : </Text>
                                </HStack>
                                <VStack className={"items-center justify-center"}>
                                    <Image source={{uri: currentTrack?.item?.album?.images[0].url}} style={{width: 100, height: 100}}/>
                                    <Text>{currentTrack?.item?.name} - {currentTrack?.item?.artists[0]?.name} </Text>
                                </VStack>
                            </VStack>

                        </VStack>
                    </VStack>
                    <Heading size={"sm"} className={"pl-6"}>Gestion du profil</Heading>
                    <VStack className={"bg-gray-100 p-4 gap-2 border border-gray-300 rounded-3xl"}>
                        <TouchableOpacity onPress={handleEditClick}>
                            <HStack className={"items-center"}>
                                <Icon as={EditIcon} className="text-typography-500 m-2 w-4 h-4"/>
                                <Text>Éditer son profil</Text>
                            </HStack>
                        </TouchableOpacity>
                        <Divider className={"my-1"}/>
                        <TouchableOpacity onPress={() => logout()}>
                            <HStack className={"items-center"}>
                                <Icon as={ExternalLinkIcon} className="text-typography-500 m-2 w-4 h-4"/>
                                <Text>Se déconnecter</Text>
                            </HStack>
                        </TouchableOpacity>
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    )
}

