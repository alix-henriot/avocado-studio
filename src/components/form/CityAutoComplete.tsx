import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Controller, useFormContext } from "react-hook-form";

type FrenchCity = {
  code: string;
  nom: string;
  centre: { coordinates: [number, number] };
};

export function CityAutocomplete() {
  const { control, setValue } = useFormContext();
  const list = useAsyncList<FrenchCity>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${filterText}&boost=population&fields=code,nom,centre`,
        { signal }
      );
      return { items: await res.json() };
    },
  });

  return (
    <Controller
      name="city"
      control={control}
      render={({ field }) => (
        <Autocomplete
          label="City"
          placeholder="Search for a city"
          isRequired
          inputValue={list.filterText}
          isLoading={list.isLoading}
          items={list.items}
          onInputChange={list.setFilterText}
          onSelectionChange={(key) => {
            const city = list.items.find(c => c.code === key);
            if (city) {
              field.onChange(city.nom);
              setValue("longitude", city.centre.coordinates[0]);
              setValue("latitude", city.centre.coordinates[1]);
            }
          }}
        >
          {(city) => (
            <AutocompleteItem key={city.code} className="capitalize">
              {city.nom}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  );
}