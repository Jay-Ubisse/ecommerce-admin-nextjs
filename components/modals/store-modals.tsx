"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      toast.loading('Adicionando loja... 🚀', { id: '1'});
      const response = await axios.post('/api/stores', values);
      toast.success('Loja adicionada com sucesso! 🎉', { id: '1'});
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Alguma coisa deu errado 😢');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return(
    <Modal
    title="Adicionar Loja"
    description="Adicione uma nova loja para administrar produtos e vendas."
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
  >
    <div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} 
                      placeholder="Introduza o nome aqui..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant={"outline"} disabled={loading} onClick={storeModal.onClose}>Cancelar</Button>
                <Button variant={"default"} disabled={loading} type="submit">Continuar</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  </Modal>
  );
};
