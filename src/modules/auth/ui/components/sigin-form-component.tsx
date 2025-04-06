import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const SignInFormComponent = () => {
  const form = useForm();

  const handleOnSubmit = (formData: any) => {
    signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/dashboard",
    }, {
        onSuccess: (ctx) => {
            console.log('success', ctx);
            toast.success("Inicio de sesión exitoso");
        },
        onError: (ctx) => {
            console.log('error', ctx);
            toast.error("Error al iniciar sesión");
        }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                Ingresa tu correo electrónico
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Ingresa tu contraseña
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
};
