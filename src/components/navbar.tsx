import { signOut, useSession } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { Session } from "better-auth";
import { Button } from "./ui/button";

interface NavbarProps {
  user: Session | undefined;
}

export const Navbar = () => {
  return (
    <header className="bg-background border-b">
      <div className="flex items-center justify-between p-3">
        <h1 className="text-2xl font-bold">Relion</h1>
        <nav className="">
          <ul className="flex items-center gap-2">
            <li>
              <Button asChild variant="outline">
                <Link to="/auth/signin">Iniciar sesión</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="default">
                <Link to="/auth/register">Registrarse</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
