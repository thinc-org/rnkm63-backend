export function generateRandomString(
  len: number,
  excludeNumber = false,
): string {
  const availableString =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let generatedString = '';
  for (let i = 0; i < len; i++)
    generatedString +=
      availableString[
        Math.floor(
          Math.random() * (availableString.length - (excludeNumber ? 10 : 0)),
        )
      ];
  return generatedString;
}
export function generateRandomNumber(len: number): string {
  let generatedString = '';
  for (let i = 0; i < len; i++)
    generatedString += Math.floor(Math.random() * 10).toString();
  return generatedString;
}
//End For Test Only Section

interface PromiseCache<T> {
  exp?: number;
  value: Promise<T>;
}

/**
 * Caches a Promise-returning function
 * The cache will be invalidated in two cases:
 *  1. The Promise is resolved AND max age is reached
 *  2. The Promise rejects
 *
 * @param func The function to cache
 * @param maxAgeMillis Max age of the cache
 */
export function cachePromise<T>(
  func: () => Promise<T>,
  maxAgeMillis = 10000,
): () => Promise<T> {
  let cache: PromiseCache<T> | null = null;
  return () => {
    const currentTime = new Date().getTime();
    if (cache === null || (cache.exp && currentTime > cache.exp)) {
      cache = {
        value: func(),
      };
      cache.value.then(
        function onFulfilled() {
          cache.exp = currentTime + maxAgeMillis;
        },
        function onRejected() {
          cache = null;
        },
      );
    }
    return cache.value;
  };
}
