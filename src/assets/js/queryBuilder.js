export default function queryBuilder(productFields, productViewFields = []) {
  const productBlock = productFields.join('\n        ');

  const productViewBlock = productViewFields.length
    ? `
      productView {
        ${productViewFields.join('\n        ')}
      }`
    : '';

  return `
query productSearch(
  $phrase: String!
  $pageSize: Int
  $currentPage: Int = 1
  $filter: [SearchClauseInput!]
  $sort: [ProductSearchSortInput!]
  $context: QueryContextInput
) {
  productSearch(
    phrase: $phrase
    page_size: $pageSize
    current_page: $currentPage
    filter: $filter
    sort: $sort
    context: $context
  ) {
    total_count
    items {
      product {
        ${productBlock}
      }${productViewBlock}
    }
    page_info {
      current_page
      total_pages
    }
  }
}
`;
}
