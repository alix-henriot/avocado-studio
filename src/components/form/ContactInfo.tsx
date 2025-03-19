import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export function ContactInfo() {
  const { register } = useFormContext();

  return (
    <>
      <Input label="Email" type="email" {...register("email")} isRequired />
      <Input label="Name" {...register("name")} isRequired />
      <Input label="Company" {...register("company")} isRequired />
    </>
  );
}