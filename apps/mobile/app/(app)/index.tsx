import { VStack } from "@/components/ui/vstack";
import { Navbar } from "@/components/navbar";
import { FriendsInsight } from "@/components/friends-insight";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ZapIcon } from "lucide-react-native";

export default function HomeScreen() {
  return (
    <VStack className="h-screen w-screen items-center px-6">
      <VStack className="mt-20 h-full flex w-full" space="4xl">
        <Navbar />
        <VStack className="flex-1 justify-start w-full" space={"2xl"}>
          <FriendsInsight />
          <HStack space="lg">
            <Box className="bg-background-muted rounded-3xl p-6 flex-1 size-52">
              <VStack>
                <Heading size="md">STREAK</Heading>
                <HStack space={"md"} className={"items-center m-4"}>
                  <Icon
                    as={ZapIcon}
                    size={"xl"}
                    className={"stroke-background-100"}
                  />
                  <Text size={"4xl"}>2</Text>
                </HStack>
              </VStack>
            </Box>
            <Box className="bg-background-muted rounded-3xl p-6 flex-1"></Box>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
