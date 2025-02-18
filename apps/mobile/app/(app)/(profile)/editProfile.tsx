import { useState } from "react";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import useAuthStore from "@/components/providers/auth-provider";
import {tuyau} from "@/constants/tuyau";
import {useMutation, useQueryClient} from "@tanstack/react-query";

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
        <VStack className="h-screen w-screen px-6">
            <TouchableOpacity onPress={handleReturn} className="absolute top-16 left-4 px-4 py-2">
                <Text className="font-bold">← Retour</Text>
            </TouchableOpacity>
            <VStack className="mt-32 h-full flex w-full" space="xl">
                <Heading size="4xl">Éditer son profil</Heading>
                <VStack space="md" className="w-full bg-gray-100 p-4 gap-2 border border-gray-300 rounded-3xl">
                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Pseudo</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant={"underlined"}>
                            <InputField placeholder="Johnny Hood"></InputField>
                        </Input>
                    </FormControl>
                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>À propos de moi</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant={"underlined"}>
                            <InputField
                                placeholder="John Doe"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </Input>
                    </FormControl>
                </VStack>
                <Button onPress={() => mutation.mutate(description)}>
                    <ButtonText>Sauvegarder</ButtonText>
                </Button>
            </VStack>
        </VStack>
    );
}
