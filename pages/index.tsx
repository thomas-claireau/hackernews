import Card from "@/components/Card";
import Container from "@/components/Container";
import Filters from "@/components/Filters";
import Layout from "@/components/Layout";
import { Post } from "@/types/posts";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

      router.replace({
        query: { ...router.query, type: filterName },
      });

      setLoading(true);
    },
    [router]
  );

  const renderPosts = useMemo(() => {
    setLoading(false);

    return posts.map((post) => <Card key={post.id} post={post} />);
  }, [posts]);

  return (
    <Layout>
      <Container className="mt-8 flex flex-col items-center gap-8">
        <Filters filters={filters} onClick={handleFilters} loading={loading} />
        <div className="grid grid-cols-3 gap-4">{renderPosts}</div>
      </Container>
    </Layout>
  );
}

async function getPostIds(type = "topstories") {
  if (!type) type = "topstories";

  const res = await fetch(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`);

  return await res.json();
}

export async function getServerSideProps({ res, query }) {
  let posts = [];
  const { type } = query;
  const postIds = await getPostIds(type);

  if (postIds.length)
    posts = await Promise.all(
      postIds.map(async (postId) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`);

        return res.json();
      })
    );

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return { props: { posts } };
}
