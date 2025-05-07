import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { tuyau } from "@/constants/tuyau";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Icons } from "@/components/icons";
  import { VStack } from "@/components/ui/vstack";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import {BorderContainer} from "@/components/ui/BorderContainer";

export function FriendsInsight() {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const friendsData = await tuyau
        .users({ id: 1 })
        .friends.$get({ query: { status: "pending" } })
        .unwrap();
      console.log(friendsData);
      return friendsData;
    },
  });

  if (isLoading) {
    return <Text>loading</Text>;
  }

  const remainingFriends = friends?.slice(3) || [];

  return (
    <VStack space="md">
      <HStack className="justify-between items-center">
        <Text className="font-black text-black" size="3xl">
          Friends
        </Text>
        <Link href={"/friends"} className="uppercase tracking-normal text-rythmix-primary">Show all</Link>
      </HStack>
      <BorderContainer className="px-4 py-6">
        {friends?.length ? (
          <HStack className="items-center justify-between">
            {/* @ts-ignore */}
            <AvatarGroup className="mx-2">
              {friends?.slice(0, 3).map((friend) => (
                <Avatar
                  key={friend.email}
                  className="border-2 border-outline-0"
                  size="md"
                >
                  <AvatarFallbackText>{friend.username}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: friend.avatarUrl,
                    }}
                  />
                  <AvatarBadge className="border-[1px]" />
                </Avatar>
              ))}
              {remainingFriends?.length > 0 && (
                <Avatar size="md" className="border-2 border-outline-0">
                  <AvatarFallbackText>
                    {`+ ${remainingFriends?.length}`}
                  </AvatarFallbackText>
                </Avatar>
              )}
            </AvatarGroup>
            <Button action="secondary" className="rounded-2xl size-10">
              <ButtonIcon as={Icons.plus}></ButtonIcon>
            </Button>
          </HStack>
        ) : (
          <Text className="font-extralight text-black" size="md">Start making friends !</Text>
        )}
      </BorderContainer>
    </VStack>
  );
}
