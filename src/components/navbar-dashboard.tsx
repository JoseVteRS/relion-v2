import { signOut } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { User } from "better-auth";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
interface NavbarDashboardProps {
  user: User | undefined;
}

export const NavbarDashboard = ({ user }: NavbarDashboardProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    await queryClient.invalidateQueries({ queryKey: ["user"] });
    await router.invalidate();
  };

  return (
    <header className="bg-background border-b">
      <div className="flex items-center justify-between p-3">
        <h1 className="text-2xl font-bold">Relion</h1>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
          >
            <LogOutIcon className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
