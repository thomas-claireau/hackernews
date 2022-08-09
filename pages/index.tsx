import Card from "@/components/Card";
import Container from "@/components/Container";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ArrowTopSVG from "@/components/ui/ArrowTopSVG";
import { Post } from "@/types/posts";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [onTop, setOnTop] = useState(false);
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

  const onScroll = useCallback(() => {
    setScrollY(window.pageYOffset);
  }, []);

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

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => setOnTop(scrollY > 0), [scrollY]);

  useEffect(() => {
    console.log("is loading", loading);
  }, [loading]);

  const renderPosts = useMemo(() => {
    setLoading(false);

    return posts.map((post) => <Card key={post.id} post={post} />);
  }, [posts]);

  return (
    <div>
      <Header />
      <Container className="mt-8 flex flex-col items-center gap-8">
        <Filters filters={filters} onClick={handleFilters} loading={loading} />
        <div className="grid grid-cols-3 gap-4">{renderPosts}</div>
      </Container>

      {onTop && (
        <button className="btn btn-circle fixed bottom-6 right-5 ml-auto" onClick={() => window.scrollTo(0, 0)}>
          <ArrowTopSVG />
        </button>
      )}
    </div>
  );
}

async function getPostIds(type = "topstories") {
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
