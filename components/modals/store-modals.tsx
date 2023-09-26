"use client";

import * as z from "zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Insira o nome da loja.",
  }),
})

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);

      toast.success("Loja criada com sucesso!");
    } catch (error) {
      toast.error("Ocorreu algum erro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Store form"
      description="Store form description"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 pt-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="E-commerce" 
                        {...field}
                        disabled={loading}  
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end pt-6 gap-3">
                <Button variant={"secondary"} onClick={storeModal.onClose} disabled={loading}  >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}  >Continuar</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
