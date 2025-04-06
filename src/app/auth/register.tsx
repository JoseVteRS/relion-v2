import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterFormComponent } from "@/modules/auth/ui/components/register-form-component";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="w-full md:w-2/5">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Registrarse</CardTitle>
        <CardDescription>
          Crea una cuenta para continuar y crear tu primera lista
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterFormComponent />
      </CardContent>
    </Card>
  );
}
