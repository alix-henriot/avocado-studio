import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import React from "react";
import { Controller, useController } from "react-hook-form";

type PlaceStepProps = {
  setValue: any;
  control: any;
};
type FrenchCitiesProps = {
  nom: string;
  code: string;
  _score: number;
  departement: { code: number; nom: string };
};

const PlaceStep: React.FC<PlaceStepProps> = ({ setValue, control }) => {


  let list = useAsyncList<FrenchCitiesProps>({
    async load({ signal, filterText }) {
      let res = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${filterText}&boost=population`,
        { signal }
      );
      let json = await res.json();

      return {
        items: json,
      };
    },
  });

  return (
    <div
    className='grid grid-flow-row gap-4'
    >
      <h4>Where would you like to shoot?</h4>
      <Controller
        name="city"
        control={control}
        rules={{ required: true }}
        render={() => (
          <Autocomplete
              label="City"
              placeholder="Please choose a city"
              isRequired
              inputValue={list.filterText}
              isLoading={list.isLoading}
              items={list.items}
              onInputChange={list.setFilterText}
              onSelectionChange={(city) => setValue('city', city)}
            >
              {(item: FrenchCitiesProps) => (
                <AutocompleteItem key={item.nom} className="capitalize">
                  {item.nom}
                </AutocompleteItem>
              )}
            </Autocomplete>
        )}/>
      <Controller
        name="setting"
        control={control}
        rules={{ required: true }}
        render={() => (
          <CheckboxGroup
          label='Setting'
          isRequired
          onChange={(setting) => setValue('setting', setting)}
          >
            <Checkbox value='outdoor'>Outdoor</Checkbox>
            <Checkbox value='indoor'>Indoor</Checkbox>
          </CheckboxGroup>
        )}
      />
    </div>
  );
};

export default PlaceStep;

/*
<Controller
        name="city"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Autocomplete
            onChange={(e) => {
              setValue("city", e);
            }}
              label="City"
              placeholder="Please choose a city"
              isRequired
              inputValue={list.filterText}
              isLoading={list.isLoading}
              items={list.items}
              onInputChange={list.setFilterText}
              {...field}
            >
              {(item: FrenchCitiesProps) => (
                <AutocompleteItem key={item.code} value={item.nom} className="capitalize">
                  {item.nom}
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />*/
