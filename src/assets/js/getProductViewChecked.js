export default function getProductViewChecked(nodeList) {
  const arrayProductView = [];
  nodeList.forEach((element) => {
    arrayProductView.push(element.dataset.fieldQuery);
  });
  return arrayProductView;
}
