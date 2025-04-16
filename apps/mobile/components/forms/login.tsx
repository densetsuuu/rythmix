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
import { Image } from "@/components/ui/image";
import {Text, View} from "react-native";
import { Link, LinkText } from "@/components/ui/link";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuthStore, { MeResponse } from "@/components/providers/auth-provider";
import { randomUUID } from "expo-crypto";
import { PasswordInput } from "@/components/ui/password-input/password-input";
import { router } from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import { tuyau } from "@/constants/tuyau";

WebBrowser.maybeCompleteAuthSession();

type userInfoType={
    password :string,
    email :string
}

export function LoginForm() {
    const { me, setToken } = useAuthStore();
    const [ response ] = useAuthRequest(
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

    const { } = useQuery<MeResponse>({
        queryKey: ["currentUser", response],
        queryFn: async () => {
            return await me();
        },
    });

    const handleLoginRedirect = () => {
        router.push("/register");
    }

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

    // useEffect(() => {
    //     if (response?.type === "success") {
    //         const { access_token } = response.params;
    //         setToken(access_token);
    //         router.replace("/");
    //     }
    // }, [response]);
    
    return (
        <>
            <Image alt="Rythmix logo" className="bottom-0 left-0 absolute w-44 z-10 h-64" source={require("../../assets/images/adaptive-icon.png")}/>
            <VStack className="bg-white/70 p-12 rounded-3xl border border-white backdrop-blur-3xl">
                <VStack className="w-80">
                    <View className="mb-4">
                        <Heading size="4xl" className="font-black">Hi !</Heading>
                        <HStack className="inline-flex items-center">
                            <Text className="text-black font-extralight">First time playing?</Text>
                            <Link onPress={handleLoginRedirect} isExternal className="ml-1">
                                <LinkText className="font-black text-rythmix-primary no-underline">Sign up</LinkText>
                            </Link>
                        </HStack>
                    </View>
                    <VStack space="xl" className="w-full">
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText className="font-black">Email</FormControlLabelText>
                            </FormControlLabel>
                            <Input className="border-[3px] rounded-none border-black h-14">
                                <InputField placeholder="johndoe@gmail.com" value={userInfo.email} onChangeText={(e)=>setUserInfo((prevUser)=>({...prevUser,email:e}))}></InputField>
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
                        <View style={{
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 }, // Légèrement en bas et sur les côtés
                            shadowOpacity: 0.4,
                            shadowRadius: 3,
                            elevation: 3, // Pour Android
                        }}>
                            <LinearGradient
                              className="h-14"
                              colors={["#FF2C00","#FE63FF", "#9899FF"]}
                              start={[0, 1]}
                              end={[1, 0]}
                            >
                                <Button onPress={logIn} className="text-white bg-transparent justify-center items-center h-full uppercase font-black">
                                    <ButtonText  className="uppercase text-xl font-black">Sign in</ButtonText>
                                </Button>
                            </LinearGradient>
                        </View>
                    </VStack>
                </VStack>
            </VStack>
        </>
    );
}
