export const getData = async (postIds, query) => {
  let hasMore = true;
  let data = [];
  const nbItems = 21;
  const page = ~~query.page ? ~~query.page : 1;

  if (postIds.length) {
    const selectedPostIds = postIds.slice(nbItems * (page - 1), nbItems * page);

    data = await Promise.all(
      postIds.slice(nbItems * (page - 1), nbItems * page).map(async (postId) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`);

        return res.json();
      })
    );

    if (selectedPostIds[selectedPostIds.length - 1] === postIds[postIds.length - 1]) {
      hasMore = false;
    }
  }

  return [data, hasMore];
};
