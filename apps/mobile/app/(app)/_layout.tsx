import useAuthStore from "@/components/providers/auth-provider";
import { Redirect, Slot } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export default function AppLayout() {
  const { me } = useAuthStore();

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: me,
  });

  // if (isLoading) {
  //   return (
  //     <Center className={"h-screen"}>
  //       <Spinner size="large" />
  //     </Center>
  //   );
  // }

  if (!user && !isLoading) {
    return <Redirect href="/register" />;
  }

  return <Slot />;
}
