/* eslint-disable react-hooks/exhaustive-deps */
import Card from "@/components/Card";
import Container from "@/components/Container";
import Filters from "@/components/Filters";
import InfiniteLoader from "@/components/InfiniteLoader";
import Layout from "@/components/Layout";
import { Post } from "@/types/posts";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  data: Post[];
};

export default function Home({ data }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState([
    {
      name: "topstories",
      active: true,
    },
    {
      name: "newstories",
      active: false,
    },
  ]);

  const handleFilters = useCallback(
    (e, filterName) => {
      const elt = e.currentTarget;
      if (elt.classList.contains("tab-active")) return;

      setFilters((prevFilters) =>
        prevFilters.map((filter) => ({
          name: filter.name,
          active: filter.name === filterName,
        }))
      );

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: 1, type: filterName },
        },
        router.pathname
      );

      setIsFilter(true);
    },
    [router]
  );

  const renderPosts = useMemo(() => {
    setIsFilter(false);

    return posts.map((post) => <Card key={post.id} post={post} />);
  }, [posts]);

  const fetchData = () => {
    setTimeout(() => {
      const page = ~~router.query.page ? ~~router.query.page : 1;

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: page + 1 },
        },
        router.pathname,
        { scroll: false }
      );
    }, 500);
  };

  useEffect(() => {
    if (!isFilter) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } else {
      setPosts(() => [...data]);
    }
  }, [data]);

  return (
    <Layout>
      <Container className="mt-8 flex flex-col items-center gap-8">
        <Filters filters={filters} onClick={handleFilters} loading={isFilter} />
      </Container>
      <InfiniteScroll
        className="mt-8 relative !overflow-hidden"
        dataLength={posts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<InfiniteLoader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Container className="grid grid-cols-3 gap-4">{renderPosts}</Container>
      </InfiniteScroll>
    </Layout>
  );
}

async function getPostIds(type = "topstories") {
  if (!type) type = "topstories";

  const res = await fetch(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`);

  return await res.json();
}

export async function getServerSideProps({ res, query }) {
  let data = [];
  const { type } = query;

  const postIds = await getPostIds(type);

  const page = ~~query.page ? ~~query.page : 1;
  const nbItems = 21;

  if (postIds.length)
    data = await Promise.all(
      postIds.slice(nbItems * (page - 1), nbItems * page).map(async (postId) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`);

        return res.json();
      })
    );

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return { props: { data } };
}
