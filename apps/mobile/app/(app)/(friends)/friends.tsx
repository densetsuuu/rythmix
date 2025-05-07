import GradientText from "@/components/GradientText";
import {Center} from "@/components/ui/center";
import { router } from "expo-router";
import { Link, LinkText } from "@/components/ui/link";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore, { MeResponse } from "@/components/providers/auth-provider";
import { tuyau } from "@/constants/tuyau";
import { VStack } from "@/components/ui/vstack";
import FriendsItem from "./friendItem"
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function FriendsScreen() {

	const queryClient = useQueryClient();
	const { user } = useAuthStore();
	const [research, setResearch] = useState("");
	
	const { data: users} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const usersData = await tuyau
			.users.$get().unwrap();
			return usersData;
		},
	});

	const { data: friends } = useQuery({
		queryKey: ["friends"],
		queryFn: async () => {
		  const [accepted, pending] = await Promise.all([
			tuyau.users({ id: user!.id }).friends.$get({ query: { status: "accepted" } }).unwrap(),
			tuyau.users({ id: user!.id }).friends.$get({ query: { status: "pending" } }).unwrap(),
		  ]);
		  return [...accepted, ...pending];
		},
	});

	const addFriendMutation = useMutation({
        mutationFn: async (friendId : string) => await tuyau
		.users({ id: user!.id }).friends.$post({ friendId }).unwrap(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		}
    });

	const removeFriendMutation = useMutation({
		mutationFn: async (friendId : string) => await tuyau
		.users({ id: user!.id }).friends({ friendId }).$delete().unwrap(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		}
	});

	const acceptFriendMutation = useMutation({
		mutationFn: async (friendId : string) => await tuyau
		.users({ id: user!.id }).friends({ friendId }).$put({ action: "accept" }).unwrap(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		}
	});

	const rejectFriendMutation = useMutation({
		mutationFn: async (friendId : string) => await tuyau
		.users({ id: user!.id }).friends({ friendId }).$put({ action: "reject" }).unwrap(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		}
	});

	const handleHomeRedirect = () => {
        router.replace("/");
    }
		return (
			<VStack space="md">
				<Center className="h-screen w-screen">
					<Link onPress={handleHomeRedirect} isExternal className="ml-1">
						<LinkText className="font-black text-rythmix-primary no-underline">Home</LinkText>
					</Link>
					<GradientText variant={"primary"}>Friends</GradientText>
					{friends && friends.map((friend) => (
					<VStack key={friend.id}>
						<FriendsItem 
							avatarUrl={friend.profile?.avatarUrl}
							username={friend.username}
						/>
						{friend.status == "accepted" && 
							<Button onPress={() => removeFriendMutation.mutate(friend.id)}>
								<ButtonText >Delete</ButtonText>
							</Button>
						}
						{friend.status == "pending" && !friend.sender &&
							<>
								<Button onPress={() => acceptFriendMutation.mutate(friend.id)}>
									<ButtonText >accept</ButtonText>
								</Button>
								<Button onPress={() => rejectFriendMutation.mutate(friend.id)}>
									<ButtonText >refuse</ButtonText>	
								</Button>
							</>
						}
						{friend.status == "pending" && friend.sender &&
							<Text>pending</Text>
						}
					</VStack>
					))}
					<Input className="border-[3px] border-black rounded-none h-14">
					<InputField
						placeholder="username"
						value={research}
						onChangeText={setResearch} // Directly pass setResearch
					/>
					</Input>
					<GradientText variant={"primary"}>users</GradientText>
					{users &&
						users
							.filter((user) =>
							research.length > 0
								? user.username.toLowerCase().startsWith(research.toLowerCase())
								: false
							)
							.map((user) => (
							<VStack key={user.id}>
								<FriendsItem
								avatarUrl={user.profile?.avatarUrl}
								username={user.username}
								/>
								<Button onPress={() => addFriendMutation.mutate(user.id)}>
									<ButtonText >Add</ButtonText>
								</Button>
							</VStack>
					))}
				</Center>				
			</VStack>
		);
}