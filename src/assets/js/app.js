import '../../style.css';
import getProductChecked from './getProductChecked';
import queryBuilder from './queryBuilder';

const form = document.getElementById('queryForm');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const productSelected = document.querySelectorAll(
    '[data-group="product"]:checked',
  );

  const arrayProducts = getProductChecked(productSelected);
  if (!arrayProducts.length) {
    arrayProducts.push('sku', 'name');
  }

  const query = queryBuilder(arrayProducts);

  console.log('test function get', arrayProducts);
  console.log('test query', query);
}
