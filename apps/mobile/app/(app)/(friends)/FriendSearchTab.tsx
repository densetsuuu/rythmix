import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import FriendsItem from "./friendItem";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/components/providers/auth-provider";
import { tuyau } from "@/constants/tuyau";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function FriendSearchTab() {
  const [research, setResearch] = useState("");
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await tuyau.users.$get().unwrap(),
  });

  const addFriendMutation = useMutation({
    mutationFn: async (friendId: string) =>
      await tuyau.users({ id: user!.id }).friends.$post({ friendId }).unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const filteredUsers = users?.filter((u) =>
    research.length > 0 ? u.username.toLowerCase().startsWith(research.toLowerCase()) : false
  );

  return (
    <VStack space="md" className="flex-1">
      <Text className="font-black text-rythmix-white text-4xl">
            Friend Search
      </Text>

      <Input className="border-[6px] rounded-none border-white h-20" style={{ marginBottom: 20 }}>
        <InputField 
          placeholder="Start making friends !"
          className={"px-4 text-rythmix-white"} 
          value={research} 
          onChangeText={setResearch}></InputField>
      </Input>

      {filteredUsers?.map((user) => (
        <HStack key={user.id} className="justify-between items-center">

            <View className="flex-1">
              <FriendsItem avatarUrl={user.profile?.avatarUrl} username={user.username} />
            </View>

            <View className="flex-1">
              <LinearGradient
              className="h-auto"
              colors={["#FF2C00","#FE63FF", "#9899FF"]}
              start={[0, 1]}
              end={[1, 0]}
              >
                <Button className="text-rythmix-dark bg-transparent uppercase h-10"> 
                  <ButtonText>Ajouter</ButtonText>
                </Button>
              </LinearGradient>
            </View>

        </HStack>
      ))}

    </VStack>
  );
}