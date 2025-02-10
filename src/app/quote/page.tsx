"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import {
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { useAsyncList } from "@react-stately/data";
import Nav from "@/components/ui/Nav";
import { redirect } from "next/navigation";


export type FormValues = {
  service: number; // 1:'fashion' | 2:'event' | 3:'food' | 4:'wedding' | 5:'product';
  material: number; //1 :'photo' | 2:'video' | 3:'photo-video'
  editing: boolean;
  quantity: number;
  city: string;
  //coordinates: [number, number];
  longitude: number;
  latitude: number;
  setting: string[]; //Array<"indoor" | "outdoor" | "studio">;
  name: string;
  company: string;
  email: string;
  date: any;
};

function Form() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  /* useEffect(() => {
    fetch service, setting, ..., and map values into the form
  }, []) */

  const calculateEditingId = (editing: boolean, material: number) => {
    if (!editing) return 1;
    return material === 1 ? 2 : 2; // Adjust according to your actual requirements
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(
      data
    )
    try {
      const response = await fetch('/api/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          service_id: Number(data.service),
          material_id: Number(data.material),
          //setting: data.setting.map(Number),
          editing_id: calculateEditingId(data.editing, data.material)
        })
      });
  
      if (!response.ok) throw new Error('Submission failed');
      
      // Handle success
      //redirect(`/quote/${response.submission[0].id}`)
    } catch (error) {
      console.error('Submission error:', error);
    }

  };

  const shootingTypeValue = watch("service");
  const materialValue = watch("material");
  const settingValue = watch("setting");

  type FrenchCitiesProps = {
    nom: string;
    code: string;
    _score: number;
    centre: { type: string; coordinates: [number, number] };
    departement: { code: number; nom: string };
  };

  let list = useAsyncList<FrenchCitiesProps>({
    async load({ signal, filterText }) {
      let res = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${filterText}&boost=population&fields=code,nom,centre`,
        { signal }
      );
      let json = await res.json();

      return {
        items: json,
      };
    },
  });

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="container p-8 mx-auto md:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-flow-row gap-4 mb-6"
          >
            
            <Select
              placeholder="Fashion, Business event..."
              label="Service"
              isRequired
              {...register("service")}
            >
              <SelectItem key={1}>
                Fashion
              </SelectItem>
              <SelectItem key={2}>
                Event
              </SelectItem>
              <SelectItem key={3}>
                Food
              </SelectItem>
              <SelectItem key={4}>
                Wedding
              </SelectItem>
              <SelectItem key={5}>
                Product
              </SelectItem>
            </Select>

            <Select
              placeholder="Fashion, Business event..."
              label="Shooting type"
              isRequired
              {...register("material")}
            >
              <SelectItem value={1} key={1}>
                Photos
              </SelectItem>
              <SelectItem value={2} key={2}>
                Videos
              </SelectItem>
              <SelectItem value={3} key={3}>
                Photos and Videos
              </SelectItem>
            </Select>
          </motion.div>

          {shootingTypeValue && materialValue && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-flow-row gap-4 mb-6"
            >
              {materialValue !== 1 && (
                <Switch {...register("editing")}>Do you need editing?</Switch>
              )}

              <Input
                label={`Quantity`}
                isRequired
                defaultValue="1"
                labelPlacement="outside"
                description={`Specify the quantity required for this shoot.`}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      Quantity
                    </span>
                  </div>
                }
                type="number"
                {...register("quantity", { valueAsNumber: true })}
              />

              <Controller
                name="city"
                control={control}
                render={() => (
                  <Autocomplete
                    label="City"
                    placeholder="Please choose a city"
                    isRequired
                    inputValue={list.filterText}
                    isLoading={list.isLoading}
                    items={list.items}
                    onInputChange={list.setFilterText}
                    {...register("city")}
                    onSelectionChange={(key: any | null) => {
                      if (key) {
                        // Find the selected city based on the key (which is the code)
                        const selectedCity = list.items.find(
                          (item) => item.code === key
                        );
                        if (selectedCity) {
                          //setValue("city", selectedCity.nom);
                          setValue(
                            "longitude",
                            selectedCity.centre.coordinates[0]
                          );
                          setValue(
                            "latitude",
                            selectedCity.centre.coordinates[1]
                          );
                        }
                      }
                    }}
                  >
                    {(item: FrenchCitiesProps) => (
                      <AutocompleteItem
                        key={item.code}
                        value={item.nom}
                        className="capitalize"
                      >
                        {item.nom}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Input type="date" label="Date" isRequired {...field} />
                )}
              />
              <Controller
                name="setting"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    isRequired
                    label="Setting"
                    aria-label="Setting"
                    {...field}
                    orientation="horizontal"
                  >
                    <Checkbox key={1} value={"1"}>
                      Outdoor
                    </Checkbox>
                    <Checkbox key={2} value={"2"}>
                      Indoor
                    </Checkbox>
                    <Checkbox key={3} value="3">
                      Studio
                    </Checkbox>
                  </CheckboxGroup>
                )}
              />
            </motion.div>
          )}

          {settingValue?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-flow-row gap-4 mb-6"
            >
              <Input
                label="Email"
                type="email"
                {...register("email")}
                isRequired
              />
              <Input label="Name" {...register("name")} isRequired />
              <Input label="Company" {...register("company")} isRequired />
            </motion.div>
          )}

          <Button type="submit" color="success" className="w-full mt-8">
            Get a quote
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Form;
