// form-hook.tsx
import { useForm } from "react-hook-form";
import { FormValues } from "./schema";

export const useFormWithDependencies = (options?: Parameters<typeof useForm<FormValues>>[0]) => {
  return useForm<FormValues>({
    ...options,
    defaultValues: {
      service: undefined,
      material: undefined,
      editing: false,
      quantity: 1,
      city: "",
      longitude: 0,
      latitude: 0,
      setting: [],
      name: "",
      company: "",
      email: "",
      date: "",
    },
  });
};