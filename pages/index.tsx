import Card from "@/components/Card";
import Container from "@/components/Container";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import ArrowTopSVG from "@/components/ui/ArrowTopSVG";
import { Post } from "@/types/posts";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
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

  const handleFilters = useCallback((e, filterName) => {
    const elt = e.currentTarget;
    if (elt.classList.contains("tab-active")) return;

    setFilters((prevFilters) =>
      prevFilters.map((filter) => ({
        name: filter.name,
        active: filter.name === filterName,
      }))
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => setOnTop(scrollY > 0), [scrollY]);

  return (
    <div>
      <Header />
      <Container className="mt-8 flex flex-col items-center gap-8">
        <Filters filters={filters} onClick={handleFilters} />
        <div className="grid grid-cols-3 gap-4">
          {useMemo(() => posts.map((post) => <Card key={post.id} post={post} />), [posts])}
        </div>
      </Container>

      {onTop && (
        <button className="btn btn-circle fixed bottom-6 right-5 ml-auto" onClick={() => window.scrollTo(0, 0)}>
          <ArrowTopSVG />
        </button>
      )}
    </div>
  );
}

async function getPostIds() {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);

  return await res.json();
}

export async function getServerSideProps() {
  const postIds = await getPostIds();

  const posts = await Promise.all(
    postIds.map(async (postId) => {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`);

      return res.json();
    })
  );

  return { props: { posts } };
}
