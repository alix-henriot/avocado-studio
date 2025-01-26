"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Calendar,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Switch,
  TimeInput,
} from "@nextui-org/react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useAsyncList } from "@react-stately/data";
import Nav from "@/components/ui/Nav";
import { getPriceQuote } from "@/components/server/pricing";

export type FormValues = {
  material: Array<'photos' | 'videos'>;
  service: 'fashion' | 'event' | 'food' | 'product' | 'wedding';
  editing: boolean;
  unit: number;
  name: string;
  company: string;
  email: string;
  city: string;
  setting: Array<'indoor' | 'outdoor' | 'studio'>;
  date: any;
  coordinates: [number, number]; 
};

type ServiceUnit = {
  fashion: "set";
  event: "event";
  product: "set";
  food: "set";
};

const serviceUnits: ServiceUnit = {
  fashion: "set",
  event: "event",
  product: "set",
  food: "set",
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
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const quote = await getPriceQuote(data as FormValues)
    console.log(quote)
  }

  const shootingTypeValue = watch("service");
  const materialValue = watch("material");
  const settingValue = watch("setting");

  type FrenchCitiesProps = {
    nom: string;
    code: string;
    _score: number;
    centre: { type: string, coordinates: [number, number]}
    departement: { code: number; nom: string };
  };
  

    let list = useAsyncList<FrenchCitiesProps>({
      async load({ signal, filterText }) {
        let res = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${filterText}&boost=population&fields=code,nom,centre`,
          { signal }
        );
        let json = await res.json();

        //console.log(JSON.stringify(json))
  
        return {
          items: json,
        };
      },
    });

    const unit = shootingTypeValue ? serviceUnits[shootingTypeValue] : "";

  return (
    <main className="min-h-screen">
      <Nav/>
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
              label="Shooting type"
              isRequired
              {...register("service")}
            >
              <SelectItem value="fashion" key="fashion">
                Fashion
              </SelectItem>
              <SelectItem value="event" key="event">
                Event
              </SelectItem>
              <SelectItem value="product" key="product">
                Product
              </SelectItem>
              <SelectItem value="food" key="food">
                Food
              </SelectItem>
            </Select>

            <Controller
              name="material"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  isRequired
                  label="What kind of material"
                  orientation="horizontal"
                  aria-label="Material"
                  {...field}
                >
                  <Checkbox value="photos">Photos</Checkbox>
                  <Checkbox value="videos">Videos</Checkbox>
                </CheckboxGroup>
              )}
            />
          </motion.div>

            {shootingTypeValue && materialValue?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-flow-row gap-4 mb-6"
              >
                <Switch
                  {...register("editing")}
                  isDisabled={
                    materialValue?.length === 1 && materialValue[0] === "photos"
                  }
                  defaultSelected={
                    materialValue?.length === 1 && materialValue[0] === "photos"
                  }
                >
                  {materialValue?.length === 1 && materialValue[0] === "photos"
                    ? "Editing is included"
                    : "Do you need editing?"}
                </Switch>

                <Input
                  label={`Enter the number of ${unit}`}
                  isRequired
                  defaultValue="1"
                  labelPlacement="outside"
                  description={`Specify the quantity of ${unit}(s) required for this shoot.`}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">{unit}</span>
                    </div>
                  }
                  type="number"
                  {...register("unit")}
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
                        const selectedCity = list.items.find((item) => item.code === key);
                        if (selectedCity) {
                          //setValue("city", selectedCity.nom);
                          setValue("coordinates", selectedCity.centre.coordinates);
                        }
                      }
                    }}
                  >
                    {(item: FrenchCitiesProps) => (
                      <AutocompleteItem key={item.code} value={item.nom} className="capitalize">
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
                    <DatePicker label='Date' isRequired {...field} />
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
                      //onChange={(setting) => setValue('setting', setting)}
                      //onChange={(value) => control.register("setting")}
                    >
                      <Checkbox value="outdoor">Outdoor</Checkbox>
                      <Checkbox value="indoor">Indoor</Checkbox>
                      <Checkbox value="studio">Studio</Checkbox>
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


          <Button type="submit" color="primary" className="w-full mt-8">
            Get a quote
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Form;
