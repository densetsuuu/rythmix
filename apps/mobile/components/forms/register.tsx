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
import { Image } from "@/components/ui/image";
import {Text, View} from "react-native";
import { Icons } from "@/components/icons";
import { Link, LinkText } from "@/components/ui/link";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuthStore, { MeResponse } from "@/components/providers/auth-provider";
import { randomUUID } from "expo-crypto";
import { Icon } from "@/components/ui/icon";
import { PasswordInput } from "@/components/ui/password-input/password-input";
import { router } from "expo-router";
import { tuyau } from "@/constants/tuyau";
import { useMutation } from "@tanstack/react-query";
import {BorderContainer} from "@/components/ui/BorderContainer";
import {LinearGradient} from "expo-linear-gradient";

WebBrowser.maybeCompleteAuthSession();

type userInfoType={
  username :string,
  password :string,
  email :string
}

export function RegisterForm() {

  const { me, setToken, user } = useAuthStore();
  const [userInfo, setUserInfo] = useState<userInfoType>({
    username: "",
    email: "",
    password: "",
  });  


  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "CLIENT_ID",
      redirectUri: makeRedirectUri({
        native: "rythmix://",
      }),
      state: randomUUID(),
    },
    {
      authorizationEndpoint: `${process.env.EXPO_PUBLIC_BACKEND_URL}/spotify/redirect`,
    },
  );

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

  const signUpMutation = useMutation({
    mutationFn: async () => await tuyau.users.$post(userInfo).unwrap(),
    onSuccess: (data) => {
      console.log("Inscription réussie !", data);
      logInMutation.mutate();
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription :", error);
    }
  });

  const { } = useQuery<MeResponse>({
    queryKey: ["currentUser", response],
    queryFn: async () => {
      return await me();
    },
  });
  
  function signUp() {
    signUpMutation.mutate();
  }

  const { error } = useQuery<MeResponse>({
  queryKey: ["currentUser", response],
  queryFn: async () => {
    return await me();
    },
  });
  
  const handleLoginRedirect = () => {
    router.push("/login");
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      router.replace("/");
    }
  }, [response]);

  return (
      <>
        <Image alt="Rythmix logo" className="bottom-0 left-0 absolute w-44 z-10 h-64" source={require("../../assets/images/adaptive-icon.png")}/>
        <BorderContainer className="p-12">
          <VStack className="w-80">
            <View className="mb-4">
              <Heading size="4xl" className="font-black">Hi !</Heading>
              <HStack className="inline-flex items-center">
                <Text className="text-black font-extralight">Already a player?</Text>
                <Link onPress={handleLoginRedirect} isExternal className="ml-1">
                  <LinkText className="font-black text-rythmix-primary no-underline">Sign in</LinkText>
                </Link>
              </HStack>
            </View>
            <VStack space="4xl" className="w-full">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="font-black">Email</FormControlLabelText>
                </FormControlLabel>
                <Input className="border-[3px] border-black rounded-none h-14">
                  <InputField placeholder="johndoe@gmail.com" value={userInfo.email} onChangeText={(e)=>setUserInfo((prevUser)=>({...prevUser,email:e}))}></InputField>
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="font-black">Username</FormControlLabelText>
                </FormControlLabel>
                <Input className="border-[3px] border-black rounded-none h-14" >
                  <InputField placeholder="username" value={userInfo.username} onChangeText={(e)=>setUserInfo((prevUser)=>({...prevUser,username:e}))}></InputField>
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="font-black">Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="border-[3px] rounded-none border-black h-14">
                  <PasswordInput placeholder="Enter your password"  value={userInfo.password} onChangeText={(e)=>setUserInfo((prevUser)=>({...prevUser,password:e}))}/>
                </Input>
              </FormControl>
              <View style={{ boxShadow: "0px 4px 4px 0px #00000025" }} >
                <LinearGradient
                  className="h-14"
                  colors={["#FF2C00","#FE63FF", "#9899FF"]}
                  start={[0, 1]}
                  end={[1, 0]}
                >
                  <Button onPress={signUp} className="text-white bg-transparent justify-center items-center h-full uppercase font-black">
                      <ButtonText className="uppercase text-xl font-black">Sign up</ButtonText>
                  </Button>
                </LinearGradient>
              </View>
            </VStack>
            <VStack className="w-full">
              <HStack className="my-3 w-full items-center gap-1">
                <Divider className="flex-1 bg-background-500"/>
                <Text className="text-center text-black font-extralight px-1">OR</Text>
                <Divider className="flex-1 bg-background-500"/>
              </HStack>
              <Button
                style={{ boxShadow: "0px 4px 4px 0px #00000025", backgroundColor: "#FFFFFF" }}
                variant="solid"
                  className="border-rythmix-primary h-14 rounded-none bg-white active:bg-white focus:bg-white hover:bg-white border-[3px] font-black uppercase"
                  disabled={!request}
                  onPress={() => {
                    promptAsync();
                  }}
              >
                <ButtonText className="text-rythmix-primary uppercase font-black tracking-normal">Connect
                  with</ButtonText>
                <Icon className="bg-transparent w-24 h-6 aspect-auto" as={Icons.spotify}/>
              </Button>
            </VStack>
          </VStack>
        </BorderContainer>
      </>
  );
}