export default async function queryBuilder(query) {
  const response = await fetch('https://catalog-service.adobe.io/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Content-type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
      'magento-customer-group': import.meta.env.VITE_MAGENTO_CUSTOMER_GROUP,
      'magento-environment-id': import.meta.env.VITE_MAGENTO_ENVIRONMENT_ID,
      'magento-store-code': import.meta.env.VITE_MAGENTO_STORE_CODE,
      'magento-website-code': import.meta.env.VITE_MAGENTO_WEBSITE_CODE,
      'magento-store-view-code': import.meta.env.VITE_MAGENTO_STORE_VIEW_CODE,
    },
    body: JSON.stringify({
      query,
      variables: {
        phrase: '',
        pageSize: 100,
        currentPage: 1,
        filter: [
          {
            attribute: 'categoryPath',
            eq: 'products',
          },
          {
            attribute: 'visibility',
            in: ['Catalog', 'Catalog, Search'],
          },
        ],
        sort: [
          {
            attribute: 'price',
            direction: 'ASC',
          },
        ],
        context: {
          customerGroup: 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c',
        },
      },
    }),
  });
}
