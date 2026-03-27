import '../../style.css';
import getProductChecked from './getProductChecked';
import queryBuilder from './queryBuilder';
import extractionData from './extractionData';

const form = document.getElementById('queryForm');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const productSelected = document.querySelectorAll(
    '[data-group="product"]:checked',
  );

  const arrayProducts = getProductChecked(productSelected);
  if (!arrayProducts.length) {
    arrayProducts.push('sku', 'name');
  }

  const query = queryBuilder(arrayProducts);
  const data = await extractionData(query);

  console.log('test function get', arrayProducts);
  console.log('test query', query);
  console.log('test data', data);
}
