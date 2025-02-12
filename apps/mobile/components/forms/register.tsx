import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { Text } from "react-native";
import { Icons } from "@/components/icons";
import { Link, LinkText } from "@/components/ui/link";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuthStore, { MeResponse } from "@/components/providers/auth-provider";
import { randomUUID } from "expo-crypto";
import { Icon } from "@/components/ui/icon";
import { PasswordInput } from "@/components/ui/password-input/password-input";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export function RegisterForm() {
  const { me, setToken, user } = useAuthStore();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "CLIENT_ID",
      redirectUri: makeRedirectUri({
        native: "rythmix://",
      }),
      state: randomUUID(),
    },
    {
      authorizationEndpoint: "http://localhost:3333/spotify/redirect",
    },
  );

  const { error } = useQuery<MeResponse>({
    queryKey: ["currentUser", response],
    queryFn: async () => {
      return await me();
    },
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      router.replace("/");
    }
  }, [response]);

  return (
    <VStack className="w-80">
      <Center className="mb-4">
        <Heading className="font-bold">Welcome!</Heading>
        <HStack className="inline-flex items-center">
          <Text className="text-slate-500">Already a player?</Text>
          <Link href="https://gluestack.io/" isExternal className="ml-1">
            <LinkText className="font-semibold no-underline">Sign in</LinkText>
          </Link>
        </HStack>
      </Center>
      <VStack space="md" className="w-full">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="johndoe@gmail.com"></InputField>
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <PasswordInput placeholder="Enter your password" />
          </Input>
        </FormControl>
        <Button>
          <ButtonText>Sign up</ButtonText>
        </Button>
        <HStack className="my-1 w-full relative">
          <Center className="w-full">
            <Divider className="absolute bg-background-500" />
            <Text className="bg-background-100 text-background-500 px-2">
              Or
            </Text>
          </Center>
        </HStack>
        <Button
          variant="outline"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <ButtonText>Connect with</ButtonText>
          <Icon as={Icons.spotify} color="black" />
        </Button>
      </VStack>
    </VStack>
  );
}
