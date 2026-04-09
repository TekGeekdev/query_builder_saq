import '../../style.css';
import getSelectedFields from './getSelectedFields.js';
import queryBuilder from './queryBuilder.js';
import fetchCatalogByCountry from './fetchCatalogByCountry.js';
import normalizeProductUrls from './normalizeProductUrls.js';

const form = document.getElementById('queryForm');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  try {
    const productSelected = document.querySelectorAll(
      '.query-field[data-group="product"]:checked',
    );

    const productViewSelected = document.querySelectorAll(
      '.query-field[data-group="productView"]:checked',
    );

    const productFields = getSelectedFields(productSelected);
    const productViewFields = getSelectedFields(productViewSelected);

    if (!productFields.length) {
      productFields.push('sku', 'name');
    }

    const query = queryBuilder(productFields, productViewFields);
    const data = await fetchCatalogByCountry(query);

    const cleanedItems = data.map((el) => normalizeProductUrls(el));

    console.log('Selected product fields:', productFields);
    console.log('Selected productView fields:', productViewFields);
    console.log('Generated query:', query);
    console.log('Fetched items:', cleanedItems);
  } catch (error) {
    console.error('Error in handleSubmit:', error.message);
  }
}
