import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/react";
import { ItemStatus, ItemVisibility } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, FileEdit, ListTodo, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  status: z.nativeEnum(ItemStatus),
  visibility: z.nativeEnum(ItemVisibility),
  listId: z.string().nullable(),
  externalLink: z
    .string()
    .url("El enlace debe ser una URL válida")
    .optional()
    .or(z.literal("")),
});

const visibilityOptions = [
  { label: "Público", value: ItemVisibility.PUBLIC, icon: Eye },
  { label: "Privado", value: ItemVisibility.PRIVATE, icon: EyeOff },
];

const statusOptions = [
  { label: "Borrador", value: ItemStatus.DRAFT, icon: FileEdit },
  { label: "Publicado", value: ItemStatus.PUBLISHED, icon: Send },
];

const buttonTextContext = {
  [ItemStatus.DRAFT]: {
    [ItemVisibility.PUBLIC]: "Guardar borrador público",
    [ItemVisibility.PRIVATE]: "Guardar borrador privado",
  },
  [ItemStatus.PUBLISHED]: {
    [ItemVisibility.PUBLIC]: "Publicar regalo",
    [ItemVisibility.PRIVATE]: "Publicar regalo (privado)",
  },
  [ItemStatus.ARCHIVED]: {
    [ItemVisibility.PUBLIC]: "Archivar regalo",
    [ItemVisibility.PRIVATE]: "Archivar regalo (privado)",
  },
};

const buttonTextPendingContext = {
  [ItemStatus.DRAFT]: {
    [ItemVisibility.PUBLIC]: "Guardando borrador público...",
    [ItemVisibility.PRIVATE]: "Guardando borrador privado...",
  },
  [ItemStatus.PUBLISHED]: {
    [ItemVisibility.PUBLIC]: "Publicando regalo...",
    [ItemVisibility.PRIVATE]: "Publicando regalo (privado)...",
  },
  [ItemStatus.ARCHIVED]: {
    [ItemVisibility.PUBLIC]: "Archivando regalo...",
    [ItemVisibility.PRIVATE]: "Archivando regalo (privado)...",
  },
};

type FormValues = z.infer<typeof formSchema>;

export const PresentCreateForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: ItemStatus.DRAFT,
      visibility: ItemVisibility.PRIVATE,
      listId: null,
      externalLink: "",
    },
  });

  const navigate = useNavigate();
  const trpc = useTRPC();

  // Obtener las listas
  const listsQuery = useQuery(trpc.list.get.queryOptions());

  const createPresentMutation = useMutation(
    trpc.present.create.mutationOptions({
      onSuccess: (present) => {
        navigate({ to: "/dashboard/presents" });
        toast.success(`Regalo creado correctamente: ${present.name}`);
      },
      onError: (error) => {
        toast.error("Error al crear el regalo");
      },
    })
  );

  const onSubmit = async (data: FormValues) => {
    createPresentMutation.mutate({
      ...data,
      listId: data.listId === "null" ? null : (data.listId as string | null),
    });
  };

  const status = form.watch("status");
  const visibility = form.watch("visibility");
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del regalo" {...field} />
              </FormControl>
              <FormDescription>
                El nombre del regalo o la idea que quieres compartir.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[100px]"
                  placeholder="Describe el regalo..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe el regalo o la idea que quieres compartir.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="externalLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enlace externo</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormDescription>
                Si el regalo está en una página web, puedes compartir el enlace
                aquí.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lista</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una lista (opcional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">Sin lista</SelectItem>
                  {listsQuery.data?.map((list) => (
                    <SelectItem
                      key={list.id}
                      value={list.id}
                      className="flex items-center gap-2"
                      disabled={list.status === ItemStatus.ARCHIVED}
                    >
                      <div className="flex items-center gap-2">
                        <ListTodo className="h-4 w-4" />
                        {list.name}
                        {list.status === ItemStatus.DRAFT && (
                          <span className="text-xs text-muted-foreground">
                            (borrador)
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Opcionalmente, puedes asociar este regalo a una lista existente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Visibilidad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la visibilidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {visibilityOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {buttonTextPendingContext[status][visibility]}
              </>
            ) : (
              buttonTextContext[status][visibility]
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
