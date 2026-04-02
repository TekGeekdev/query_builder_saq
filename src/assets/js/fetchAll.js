import extractionData from './extractionData';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function fetchAll(query) {
  const firstCall = await extractionData(query);

  const fullDatas = [...firstCall.data.productSearch.items];

  let currentPage = firstCall.data.productSearch.page_info.current_page;
  const totalPage = firstCall.data.productSearch.page_info.total_pages;
  console.log('log current page test', currentPage);
  console.log('log current page total', totalPage);

  while (currentPage <= totalPage) {
    const fetchOneTime = await extractionData(query, currentPage);

    fullDatas.push(...fetchOneTime.data.productSearch.items);

    console.log('download in progress : ', (currentPage / totalPage) * 100);

    currentPage++;

    await delay(500);
  }

  return fullDatas;
}
