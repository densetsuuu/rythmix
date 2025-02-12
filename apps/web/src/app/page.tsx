"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="">
        {isAuthenticated && user ? (
          <div className="flex flex-col space-y-4">
            <div className="inline-flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profile?.avatarUrl} />
                <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-normal">{user.username}</p>
                <p className="text-xs inline-flex items-center text-green-700">
                  <Icons.authenticated className="size-3 mr-0.5" />
                  Logged in
                </p>
              </div>
            </div>
            <Button
              variant="link"
              className="h-8 px-1 text-red-700"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button asChild>
            <Link href={`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/redirect`}>
              Login with <Icons.spotify fill="white" />
            </Link>
          </Button>
        )}
      </main>
    </div>
  );
}
