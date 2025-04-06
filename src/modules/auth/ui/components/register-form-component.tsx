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
import { signUp } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const RegisterFormComponent = () => {
  const api = useTRPC();
  const form = useForm();

  const registerMutationOptions = api.auth.register.mutationOptions({
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: () => {
      toast.error("Registration failed");
    },
  });
  const registerMutation = useMutation(registerMutationOptions);

  const handleOnSubmit = (formData: any) => {
    // registerMutation.mutate(formData);
    signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.username,
    }, {
        onSuccess: (ctx) => {
            console.log('success', ctx);
            toast.success("Registration successful");
        },
        onError: (ctx) => {
            console.log('error', ctx);
            toast.error("Registration failed");
        }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                This is your public display name.
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={registerMutation.isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};