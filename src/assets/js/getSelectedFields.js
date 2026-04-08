export default function getProductChecked(nodeList) {
  return [...nodeList]
    .map((element) => element.dataset.fieldQuery)
    .filter(Boolean);
}
