import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import useAuthStore from "@/components/providers/auth-provider";
import { Icons } from "@/components/icons";
import {Link} from "expo-router";
import {View} from "react-native";
import {LinearGradient} from "@/components/LinearGradient";

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <HStack style={{ boxShadow: "0px 4px 6px 2px #FF2C0025, 0px -4px 6px 2px #FF2C0025" }}
            className="w-full items-center justify-between bg-white px-6 h-32 mt-[-20]">
      <HStack className="items-center" space={"md"}>
        {user ? (
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
                      {user.username.toUpperCase()}
                    </AvatarFallbackText>
                    <AvatarImage source={{ uri: user.profile?.avatarUrl }} />
                  </Avatar>
                </LinearGradient>

                {/* Badge vert positionné en absolute */}
                <View className="absolute bottom-1 right-1 w-6 h-6 bg-green-700 rounded-full border-2 border-white z-50" />
              </View>

            </Link>

        ) : null}
        <VStack>
          <Text className="font-black text-black" size="2xl">
            {user?.username}
          </Text>
          <Text size="lg" className="font-extralight text-black">Level 4</Text>
        </VStack>
      </HStack>
      <Button
        onPress={() => logout()}
        size="lg"
        variant="solid"
        style={{ boxShadow: "0px 4px 4px 0px #00000025" }}
        className="bg-rythmix-primary rounded-none size-10"
      >
        <ButtonIcon as={Icons.logout} className="text-white" />
      </Button>
    </HStack>
  );
}
