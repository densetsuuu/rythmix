import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import FriendsItem from "./friendItem";
import useAuthStore from "@/components/providers/auth-provider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tuyau } from "@/constants/tuyau";
import { Text } from "@/components/ui/text";
import { View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import { HStack } from "@/components/ui/hstack";

export default function FriendRequestsTab() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const [, pending] = await Promise.all([
        Promise.resolve([]),
        tuyau.users({ id: user!.id }).friends.$get({ query: { status: "pending" } }).unwrap(),
      ]);
      return pending;
    },
  });

  const acceptFriendMutation = useMutation({
    mutationFn: async (friendId: string) =>
      await tuyau.users({ id: user!.id }).friends({ friendId }).$put({ action: "accept" }).unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const rejectFriendMutation = useMutation({
    mutationFn: async (friendId: string) =>
      await tuyau.users({ id: user!.id }).friends({ friendId }).$put({ action: "reject" }).unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  return (
    <VStack space="md">
      {friends?.map((friend) => (
        <HStack key={friend.id} className="items-center space-x-2">
          <View className="flex-1">
            <FriendsItem avatarUrl={friend.profile?.avatarUrl} username={friend.username} />
          </View>

          {!friend.sender && (
            <HStack className="space-x-2 items-center">
              <LinearGradient
                colors={["#FF2C00", "#FE63FF", "#9899FF"]}
                start={[0, 1]}
                end={[1, 0]}
                className=""
              >
                <Button
                  className="text-rythmix-dark bg-transparent uppercase h-8 px-4"
                  onPress={() => acceptFriendMutation.mutate(friend.id)}
                >
                  <ButtonText>Accepter</ButtonText>
                </Button>
              </LinearGradient>

              <Button
                className="text-rythmix-dark bg-transparent uppercase h-8 px-4"
                onPress={() => rejectFriendMutation.mutate(friend.id)}
              >
                <ButtonText>Refuser</ButtonText>
              </Button>
            </HStack>
          )}
        </HStack>
      ))}
    </VStack>
  );
}