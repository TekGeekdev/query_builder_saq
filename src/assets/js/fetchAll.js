import extractionData from './extractionData.js';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function fetchAll(query, filters = []) {
  const firstCall = await extractionData(query, 1, filters);

  console.log('Applied filters:', filters);
  console.log(
    'First call total_count:',
    firstCall?.data?.productSearch?.total_count,
  );
  console.log(
    'First call total_pages:',
    firstCall?.data?.productSearch?.page_info?.total_pages,
  );

  if (!firstCall?.data?.productSearch) {
    throw new Error('Invalid first response');
  }

  const productSearch = firstCall.data.productSearch;
  const fullData = [...productSearch.items];

  let currentPage = productSearch.page_info.current_page + 1;
  const totalPages = productSearch.page_info.total_pages;

  if (totalPages === 0) {
    console.log('No items found for these filters.');
    return [];
  }

  console.log('Starting pagination...');
  console.log('Current page:', currentPage);
  console.log('Total pages:', totalPages);

  while (currentPage <= totalPages) {
    let retryCount = 0;
    let success = false;

    while (!success && retryCount < 5) {
      try {
        const nextPageData = await extractionData(query, currentPage, filters);

        if (!nextPageData?.data?.productSearch) {
          throw new Error(`Invalid response on page ${currentPage}`);
        }

        fullData.push(...nextPageData.data.productSearch.items);

        console.log(
          'Download progress:',
          ((currentPage / totalPages) * 100).toFixed(2) + '%',
        );

        success = true;
        currentPage++;

        await delay(500);
      } catch (error) {
        retryCount++;

        console.error(
          `Error on page ${currentPage}, attempt ${retryCount}/5:`,
          error.message,
        );

        if (retryCount < 5) {
          console.log(
            `Retrying page ${currentPage} in ${retryCount * 3} seconds...`,
          );
          await delay(retryCount * 3000);
        } else {
          throw new Error(`Failed to fetch page ${currentPage}`);
        }
      }
    }
  }

  console.log('All data successfully fetched');

  return fullData;
}
