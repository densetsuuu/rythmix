import { useState } from "react";
import { Text } from "@/components/ui/text";
import {ImageBackground, SafeAreaView, TouchableOpacity, View} from "react-native";
import { router } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { FormControl, FormControlLabel } from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import useAuthStore from "@/components/providers/auth-provider";
import {tuyau} from "@/constants/tuyau";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import {Header} from "@/components/header";
import {LinearGradient} from "expo-linear-gradient";


export default function EditProfile() {
    const queryClient = useQueryClient()
    const {user} = useAuthStore();

    if (!user) {
        return null;
    }

    const [description, setDescription] = useState(user.description || "");

    const mutation = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: async (description: string) => {
            const result = await tuyau.users({id: user.id}).$patch({description: description}).unwrap();
            router.back();
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        }
    })

    return (
            <SafeAreaView className="h-full justify-between flex">
                <Header />
                <VStack className="h-screen w-screen bg-rythmix-black mt-[-20]" style={{ boxShadow: "0px -4px 6px 2px #FF2C0025" }}>
                    <VStack className="mt-4 h-full flex w-full px-6" space="xl">
                        <Heading size="4xl" className="text-rythmix-white font-black">Edit my profile</Heading>
                        <VStack className="mt-4 h-full flex w-full" space="xl">
                            <FormControl>
                                <FormControlLabel>
                                    <Heading size={"2xl"} className={"text-rythmix-white font-black"}>Pseudo</Heading>
                                </FormControlLabel>
                                <Input className="border-[6px] rounded-none border-white h-14">
                                    <InputField placeholder="Jojo Doe" className={"px-4 text-rythmix-white"}></InputField>
                                </Input>
                            </FormControl>
                            <FormControl>
                                <FormControlLabel>
                                    <Heading size={"2xl"} className="text-rythmix-white font-black">About me</Heading>
                                </FormControlLabel>
                                <Textarea>
                                    <TextareaInput
                                      placeholder="John Doe"
                                      value={description}
                                      onChangeText={setDescription}
                                      className="border-[6px] border-white text-rythmix-white placeholder-white"
                                      style={{
                                          color: 'white',           // Couleur du texte
                                          borderColor: 'white',     // Couleur de la bordure
                                      }}
                                    />
                                </Textarea>
                            </FormControl>

                            <View style={{ boxShadow: "0px 4px 4px 0px #00000025" }} >
                                <LinearGradient
                                  className="h-[60px]"
                                  colors={["#FF2C00","#FE63FF", "#9899FF"]}
                                  start={[0, 1]}
                                  end={[1, 0]}
                                >
                                    <Button className="text-rythmix-dark bg-transparent justify-center items-center h-full uppercase font-black">
                                        <ButtonText className="uppercase text-4xl font-black">Save</ButtonText>
                                    </Button>
                                </LinearGradient>
                            </View>
                        </VStack>
                    </VStack>
                </VStack>
            </SafeAreaView>
    );
}
