const cache = {};

const getCacheKey = o => JSON.stringify(o);

const suspender = promiser => (...args) => {
  const cacheKey = getCacheKey({promiser, args});

  if (cacheKey in cache) {
    const data = cache[cacheKey].result;
    if (!data) {
      throw cache[cacheKey].promise;
    }
    return data;
  } 

  const cacheItem = {
    promise: null,
    result: null,
  }

  cacheItem.promise = promiser.apply(null, args).then(result => cacheItem.result = result);

  cache[cacheKey] = cacheItem;

  throw cacheItem.promise;
}

export const killCache = promiser => (...args) => {
  const cacheKey = getCacheKey({promiser, args});
  delete cache[cacheKey];
}

export default suspender;