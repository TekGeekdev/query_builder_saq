export function getBaseFilters() {
  return [
    {
      attribute: 'categoryPath',
      eq: 'products',
    },
    {
      attribute: 'visibility',
      in: ['Catalog', 'Catalog, Search'],
    },
  ];
}

export function buildCountryFilters(country) {
  return [
    ...getBaseFilters(),
    {
      attribute: 'pays_origine',
      eq: country,
    },
  ];
}

export function buildFranceRegionFilters(region) {
  return [
    ...getBaseFilters(),
    {
      attribute: 'pays_origine',
      eq: 'France',
    },
    {
      attribute: 'region_origine',
      eq: region,
    },
  ];
}
