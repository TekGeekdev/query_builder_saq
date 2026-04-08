export default async function extractionData(
  query,
  currentPage = 1,
  filters = [],
) {
  try {
    const response = await fetch('https://catalog-service.adobe.io/graphql', {
      method: 'POST',
      headers: {
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
          currentPage,
          filter: filters,
          sort: [
            {
              attribute: 'price',
              direction: 'ASC',
            },
          ],
          context: {
            customerGroup: import.meta.env.VITE_MAGENTO_CUSTOMER_GROUP,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(JSON.stringify(data.errors));
    }

    return data;
  } catch (error) {
    console.error('Error in extractionData:', error.message);
    throw error;
  }
}
