import { Select, SelectItem } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export function ServiceSelection() {
  const { register } = useFormContext();
  
  return (
    <>
      <Select
        placeholder="Select service type"
        label="Service"
        isRequired
        {...register("service")}
      >
        {services.map((service) => (
          <SelectItem key={service.value} value={service.value}>
            {service.label}
          </SelectItem>
        ))}
      </Select>

      <Select
        placeholder="Select material type"
        label="Shooting Type"
        isRequired
        {...register("material")}
      >
        {materials.map((material) => (
          <SelectItem key={material.value} value={material.value}>
            {material.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

const services = [
  { value: 1, label: "Fashion" },
  { value: 2, label: "Event" },
  { value: 3, label: "Food" },
  { value: 4, label: "Wedding" },
  { value: 5, label: "Product" },
];

const materials = [
  { value: 1, label: "Photos" },
  { value: 2, label: "Videos" },
  { value: 3, label: "Photos and Videos" },
];