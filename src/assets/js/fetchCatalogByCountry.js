import fetchAll from './fetchAll.js';
import {
  buildCountryFilters,
  buildFranceRegionFilters,
} from './buildFilters.js';
import { directCountries, franceRegions } from './batchCountryConfig.js';

function dedupeBySku(items) {
  const map = new Map();

  for (const item of items) {
    const sku = item?.product?.sku;

    if (sku) {
      map.set(sku, item);
    }
  }

  return [...map.values()];
}

export default async function fetchCatalogByCountry(query) {
  const allItems = [];

  for (const country of directCountries) {
    try {
      console.log(`Fetching country: ${country}`);

      const filters = buildCountryFilters(country);
      const countryItems = await fetchAll(query, filters);

      console.log(`Done for ${country}: ${countryItems.length} items fetched`);

      allItems.push(...countryItems);
    } catch (error) {
      console.error(`Error while fetching country ${country}:`, error.message);
    }
  }

  for (const region of franceRegions) {
    try {
      console.log(`Fetching France / ${region}`);

      const filters = buildFranceRegionFilters(region);
      const regionItems = await fetchAll(query, filters);

      console.log(
        `Done for France / ${region}: ${regionItems.length} items fetched`,
      );

      allItems.push(...regionItems);
    } catch (error) {
      console.error(`Error while fetching France / ${region}:`, error.message);
    }
  }

  const uniqueItems = dedupeBySku(allItems);

  console.log('Total raw items:', allItems.length);
  console.log('Total unique items:', uniqueItems.length);

  return uniqueItems;
}
