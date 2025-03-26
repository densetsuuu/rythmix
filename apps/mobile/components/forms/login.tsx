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
import { Text } from "react-native";
import { Link, LinkText } from "@/components/ui/link";
import { useState } from "react";
import useAuthStore from "@/components/providers/auth-provider";
import { PasswordInput } from "@/components/ui/password-input/password-input";
import { router } from "expo-router";
import { tuyau } from "@/constants/tuyau";
import { useMutation } from "@tanstack/react-query";

type userInfoType={
    password :string,
    email :string
}

export function LoginForm() {

    const { setToken } = useAuthStore();

    const [userInfo, setUserInfo] = useState<userInfoType>({
        email: "",
        password: "",
      }); 

    const logInMutation = useMutation({
        mutationFn: async () => await tuyau.auth.login.$post(userInfo).unwrap(),
        onSuccess: (data) => {
            if (data.token) {
                setToken(data.token);
            } else {
                console.error("Token is undefined");
            }
            router.replace("/");
        },
        onError: (error) => {
          console.error("Erreur lors de la connexion :", error);
        },
    });

    function logIn() {
        logInMutation.mutate();
    }

    const handleSignInRedirect = () => {
        router.push("/register");
    };

    return (
        <VStack className="w-80">
      <Center className="mb-4">
        <Heading className="font-bold">Welcome!</Heading>
        <HStack className="inline-flex items-center">
              <Text className="text-black font-extralight">New player?</Text>
              <Link onPress={handleSignInRedirect} isExternal className="ml-1">
              <LinkText className="font-black text-rythmix-primary no-underline">Sign in</LinkText>
            </Link>
          </HStack>
      </Center>
      <VStack space="md" className="w-full">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="johndoe@gmail.com" value={userInfo.email} onChangeText={(e)=>setUserInfo((prevUser)=>({...prevUser,email:e}))}></InputField>
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <PasswordInput placeholder="Enter your password"  value={userInfo.password} onChangeText={(e)=>setUserInfo((prevUser)=>({...prevUser,password:e}))}/>
          </Input>
        </FormControl>
        <Button onPress={logIn}>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </VStack>
    </VStack>
    );
}
