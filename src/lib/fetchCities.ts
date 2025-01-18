

export const fetchCities = async ({filterText, signal}: any) => {
    const res = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${filterText}&boost=population`,
      { signal }
    );
    return res.json();
  };
  