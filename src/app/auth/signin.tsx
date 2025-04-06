import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFormComponent } from "@/modules/auth/ui/components/sigin-form-component";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="w-full md:w-2/5">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">¡Hola!</CardTitle>
        <CardDescription>Inicia sesión para continuar</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInFormComponent />
        <div className="flex items-center justify-start mt-5">
          <p className="text-sm text-muted-foreground">No tienes una cuenta?</p>
          <Button variant="link" asChild>
            <Link to="/auth/register">Regístrate</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
