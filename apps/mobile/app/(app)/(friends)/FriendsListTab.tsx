import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import FriendsItem from "./friendItem";
import useAuthStore from "@/components/providers/auth-provider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tuyau } from "@/constants/tuyau";

export default function FriendsListTab() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const [accepted] = await Promise.all([
        tuyau.users({ id: user!.id }).friends.$get({ query: { status: "accepted" } }).unwrap()
      ]);
      return accepted;
    },
  });

  const removeFriendMutation = useMutation({
    mutationFn: async (friendId: string) =>
      await tuyau.users({ id: user!.id }).friends({ friendId }).$delete().unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  return (
    <VStack space="md">
      {friends?.map((friend) => (
        <VStack key={friend.id}>
          <FriendsItem avatarUrl={friend.profile?.avatarUrl} username={friend.username} />
          <Button onPress={() => removeFriendMutation.mutate(friend.id)}>
            <ButtonText>Supprimer</ButtonText>
          </Button>
        </VStack>
      ))}
    </VStack>
  );
}