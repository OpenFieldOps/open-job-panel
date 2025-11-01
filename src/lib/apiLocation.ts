export type LocationProperty = {
  city: string;
  citycode: string;
  label: string;
};

type AutoCompleteResponse = {
  features: {
    properties: LocationProperty;
  }[];
};

export async function getAutoCompletionLocalisation(
  query: string
): Promise<LocationProperty[]> {
  if (query.length < 4) {
    return [];
  }

  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${query}&limit=4`
  );

  const data = (await response.json()) as AutoCompleteResponse;

  return data.features.map((feature) => feature.properties);
}
