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
import {SafeAreaView, View} from "react-native";
import {LinearGradient} from "@/components/LinearGradient";
import {Header} from "@/components/header";

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView>
      <Header />
      <HStack className="bg-rythmix-black mt-[-20] w-full items-center justify-between px-6 h-32" style={{ boxShadow: "0px 8px 25px 10px #FF2C0099, 0px -4px 6px 2px #FF2C0025" }}>
        <HStack className="items-center" space={"md"}>
        {user ? (
            <Link href={'/profile'}>
              <View className="relative">
                <LinearGradient
                  className="rounded-full p-1"
                  colors={["#FF2C00", "#FF2C00"]}
                  start={[0, 1]}
                  end={[1, 0]}
                >
                  <Avatar size="xl" className="p-[2px] bg-rythmix-black">
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
          <Text className="font-black text-rythmix-white" size="2xl">
            {user?.username}
          </Text>
          <Text size="lg" className="font-regular text-rythmix-white">Level 4</Text>
        </VStack>
      </HStack>
        <LinearGradient
          colors={['white', '#FF2C00']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          className={"p-[3px]"}
        >
        <Button
          onPress={() => logout()}
          size="lg"
          variant="solid"
          className="bg-rythmix-primary rounded-none size-10"
        >
          <ButtonIcon as={Icons.logout} className="text-rythmix-white" />
        </Button>
        </LinearGradient>
      </HStack>
    </SafeAreaView>
  );
}
