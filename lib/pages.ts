export const getData = async (postIds: number[], query: { page: number } | false) => {
  let hasMore = true;
  let data = [];
  let selectedPostIds = postIds;

  if (postIds.length) {
    if (query) {
      const nbItems = 21;
      const page = ~~query.page ? ~~query.page : 1;

      selectedPostIds = postIds.slice(nbItems * (page - 1), nbItems * page);
    }

    data = await filterPost(selectedPostIds);

    if (selectedPostIds[selectedPostIds.length - 1] === postIds[postIds.length - 1]) {
      hasMore = false;
    }
  }

  return [data, hasMore];
};

async function filterPost(selectedPostIds) {
  const responses = await Promise.all(
    selectedPostIds.map(async (postId) => {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`);

      return await res.json();
    })
  );

  return responses.filter((response) => {
    return response.type == "story" ? response : false;
    // return response?.title ? response : false;
  });
}
