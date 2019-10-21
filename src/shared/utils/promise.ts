// polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
export const PromiseAllSettled = async <T>(promises: Promise<T>[]) => {
  return Promise.all(promises.map(p => p.then(
    (v) => {
      return { status: 'fulfilled', value: v as T };
    },
    (error) => {
      return { status: 'rejected', reason: error };
    }
  )));
}

export const PromiseAllSettledFilterFulfilled = async <T>(promises: Promise<T>[]) => {
  const results = await PromiseAllSettled(promises)
  return results.filter((r => r.status === `fulfilled`)).map(r => 
    (r as { status: 'fulfilled', value: T }).value
  )
}