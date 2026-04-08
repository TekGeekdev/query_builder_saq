import '../../style.css';
import getProductChecked from './getProductChecked.js';
import queryBuilder from './queryBuilder.js';
import fetchAll from './fetchAll.js';

const form = document.getElementById('queryForm');

form.addEventListener('submit', handleSubmit);

const filters = [
  {
    attribute: 'categoryPath',
    eq: 'products',
  },
  {
    attribute: 'visibility',
    in: ['Catalog', 'Catalog, Search'],
  },
  {
    attribute: 'pays_origine',
    eq: 'France',
  },
  {
    attribute: 'categories',
    in: ['vin'],
  },
];

async function handleSubmit(event) {
  event.preventDefault();

  try {
    const productSelected = document.querySelectorAll(
      '.query-field[data-group="product"]:checked',
    );

    const productViewSelected = document.querySelectorAll(
      '.query-field[data-group="productView"]:checked',
    );

    const productFields = getProductChecked(productSelected);
    const productViewFields = getProductChecked(productViewSelected);

    if (!productFields.length) {
      productFields.push('sku', 'name');
    }

    const query = queryBuilder(productFields, productViewFields);
    const data = await fetchAll(query, filters);

    console.log('Selected product fields:', productFields);
    console.log('Selected productView fields:', productViewFields);
    console.log('Generated query:', query);
    console.log('Fetched items:', data);
  } catch (error) {
    console.error('Error in handleSubmit:', error.message);
  }
}
