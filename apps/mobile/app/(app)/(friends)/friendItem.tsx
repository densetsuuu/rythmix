import GradientText from "@/components/GradientText";
import {Center} from "@/components/ui/center";
import { router } from "expo-router";
import { Link, LinkText } from "@/components/ui/link";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore, { MeResponse } from "@/components/providers/auth-provider";
import { tuyau } from "@/constants/tuyau";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import {LinearGradient} from "@/components/LinearGradient";
import {View} from "react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { Text } from "@/components/ui/text";

type FriendsItemProps = {
    avatarUrl? : string,
    username:string,
}

  
const FriendsItem: React.FC<FriendsItemProps> = (props) => {
    const [research, setResearch] = useState("");

    const handleHomeRedirect = () => {
        router.replace("/");
    };

    return (
      <HStack style={{ boxShadow: "0px 4px 6px 2px #FF2C0025, 0px -4px 6px 2px #FF2C0025" }}
            className="w-full items-center justify-between bg-white px-6 h-32 mt-[-20]">
        <HStack className="items-center" space={"md"}>
              <Link href={'/profile'}>
                <View className="relative">
                  <LinearGradient
                    className="rounded-full p-1"
                    colors={["#FF2C00", "#9899FF"]}
                    start={[0, 1]}
                    end={[1, 0]}
                  >
                    <Avatar size="xl" className="p-[2px] bg-white">
                      <AvatarFallbackText>
                        {props.username.toUpperCase()}
                      </AvatarFallbackText>
                      <AvatarImage source={{ uri: props.avatarUrl }} />
                    </Avatar>
                  </LinearGradient>

                  {/* Badge vert positionné en absolute */}
                  <View className="absolute bottom-1 right-1 w-6 h-6 bg-green-700 rounded-full border-2 border-white z-50" />
                </View>

              </Link>

          <VStack>
            <Text className="font-black text-black" size="2xl">
              {props.username}
            </Text>
            <Text size="lg" className="font-extralight text-black">Level 4</Text>
          </VStack>
        </HStack>
    </HStack>
    );
};

export default FriendsItem
