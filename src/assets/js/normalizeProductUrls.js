function normalizeUrl(url) {
  if (!url) return url;

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  return url;
}

export default function normalizeProductUrls(item) {
  const product = item?.product;

  if (!product) {
    return item;
  }

  return {
    ...item,
    product: {
      ...product,
      canonical_url: normalizeUrl(product.canonical_url),
      image: product.image
        ? {
            ...product.image,
            url: normalizeUrl(product.image.url),
          }
        : product.image,
    },
  };
}
