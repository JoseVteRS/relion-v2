import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/react";
import { ItemStatus, ItemVisibility } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon, Link, Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  status: z.nativeEnum(ItemStatus),
  visibility: z.nativeEnum(ItemVisibility),
  eventDate: z.date(),
});

const statusOptions = [
  { label: "Borrador", value: ItemStatus.DRAFT },
  { label: "Publicada", value: ItemStatus.PUBLISHED },
];

const buttonTextContext = {
  [ItemStatus.DRAFT]: "Guardar como borrador",
  [ItemStatus.PUBLISHED]: "Publicar lista",
  [ItemStatus.ARCHIVED]: "Archivar lista",
};

const buttonTextPendingContext = {
  [ItemStatus.DRAFT]: "Guardando...",
  [ItemStatus.PUBLISHED]: "Publicando...",
  [ItemStatus.ARCHIVED]: "Archivando...",
};

type FormValues = z.infer<typeof formSchema>;

export const ListCreateForm = () => {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const createListMutationOptions = trpc.list.create.mutationOptions({
    onSuccess: () => {
      navigate({ to: "/dashboard/lists" });
      toast.success("Lista creada correctamente");

    },
    onError: () => {
      toast.error("Error al crear la lista");
    },
  });
  const createListMutate = useMutation(createListMutationOptions);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: ItemStatus.DRAFT,
      visibility: ItemVisibility.PUBLIC,
      eventDate: new Date(),
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      createListMutate.mutate(data);
    } catch (error) {
      console.error("Error al crear la lista:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4 border rounded p-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la lista" {...field} />
                </FormControl>
                <FormDescription>
                  Nombre de la lista que quieres crear.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha del evento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Selecciona la fecha del evento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado de la lista" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Visibilidad de la lista. Puede ser Pública o Privada. Si es
                  pública será visible para todos los usuarios. Si es privada
                  solo será visible para ti.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || createListMutate.isPending}
            size="lg"
          >
            {createListMutate.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {buttonTextPendingContext[form.watch("status")]}
              </>
            ) : (
              buttonTextContext[form.watch("status")]
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
