export const getData = async (postIds, query) => {
  let data = [];
  const nbItems = 21;
  const page = ~~query.page ? ~~query.page : 1;

  if (postIds.length)
    data = await Promise.all(
      postIds.slice(nbItems * (page - 1), nbItems * page).map(async (postId) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`);

        return res.json();
      })
    );

  return data;
};
