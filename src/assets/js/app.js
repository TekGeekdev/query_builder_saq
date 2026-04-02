import '../../style.css';
import getProductChecked from './getProductChecked';
import queryBuilder from './queryBuilder';

import getProductViewChecked from './getProductViewChecked';
import fetchAll from './fetchAll';

const form = document.getElementById('queryForm');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const productSelected = document.querySelectorAll(
    '[data-group="product"]:checked',
  );

  const productViewSelected = document.querySelectorAll(
    '[data-group="productView"]:checked',
  );

  const arrayProducts = getProductChecked(productSelected);
  if (!arrayProducts.length) {
    arrayProducts.push('sku', 'name');
  }

  const arrayProductsView = getProductViewChecked(productViewSelected);

  const query = queryBuilder(arrayProducts, arrayProductsView);
  const data = await fetchAll(query);

  console.log('test function get', arrayProducts);
  console.log('test query', query);
  console.log('test data', data);
  console.log('test data2', data.data.productSearch.items[0]);
}
