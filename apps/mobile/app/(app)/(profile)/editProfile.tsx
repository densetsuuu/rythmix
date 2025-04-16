import { useState } from "react";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from "react-native";
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


export default function EditProfile() {
    const queryClient = useQueryClient()
    const {user} = useAuthStore();

    if (!user) {
        return null;
    }

    const [description, setDescription] = useState(user.description || "");

    const handleReturn = () => {
        router.back();
    };

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
        <VStack className="h-screen w-screen bg-white shadow-lg mt-[-20] shadow-rythmix-primary/20">
            <TouchableOpacity onPress={handleReturn} className="absolute top-16 right-4 z-10 px-4 py-2">
                <Text className="font-bold">← Retour</Text>
            </TouchableOpacity>
            <VStack className="mt-16 h-full flex w-full px-6" space="xl">
                <Heading size="4xl" className="font-black">Edit my profile</Heading>
                <VStack className="mt-4 h-full flex w-full" space="xl">
                    <FormControl>
                        <FormControlLabel>
                            <Heading size={"md"} className={"pl-6 text-black font-black"}>Pseudo</Heading>
                        </FormControlLabel>
                        <Input className="border-black px-2 py-4 h-16">
                            <InputField placeholder="Jojo Doe"></InputField>
                        </Input>
                    </FormControl>
                    <FormControl>
                        <FormControlLabel>
                            <Heading size={"md"} className={"pl-6 text-black font-black"}>About me</Heading>
                        </FormControlLabel>
                        <Textarea className="border-black px-2 py-4">
                            <TextareaInput
                                placeholder="John Doe"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </Textarea>
                    </FormControl>
                    <Button onPress={() => mutation.mutate(description)}>
                        <ButtonText>Sauvegarder</ButtonText>
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
}
