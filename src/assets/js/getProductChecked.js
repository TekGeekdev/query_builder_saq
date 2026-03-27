export default function getProductChecked(nodeList) {
  const arrayProduct = [];
  nodeList.forEach((element) => {
    arrayProduct.push(element.dataset.fieldQuery);
  });
  return arrayProduct;
}
