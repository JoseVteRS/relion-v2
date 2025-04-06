import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFormComponent } from "@/modules/auth/ui/components/sigin-form-component";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center container">
          <Outlet />
    </div>
  );
}
