import '../../style.css';
import getProductChecked from './getProductChecked';

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

  console.log('test function get', arrayProducts);
}
