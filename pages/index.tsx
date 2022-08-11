import Container from "@/components/Container";
import Filters from "@/components/Filters";
import Layout from "@/components/Layout";
import { Post } from "@/types/posts";
import { getData } from "@/lib/pages";
import Posts from "@/components/Posts";
import { useState } from "react";

type Props = {
  data: Post[];
  hasMore: boolean;
};

export default function Home({ data, hasMore }: Props) {
  const [isFilter, setIsFilter] = useState(false);

  return (
    <Layout>
      <Container className="mt-8 flex flex-col items-center gap-8">
        <Filters loading={isFilter} setIsFilter={setIsFilter} />
      </Container>
      <Posts data={data} isFilter={isFilter} setIsFilter={setIsFilter} hasMore={hasMore} />
    </Layout>
  );
}

async function getPostIds(type = "topstories") {
  if (!type) type = "topstories";

  const res = await fetch(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`);

  return await res.json();
}

export async function getServerSideProps({ res, query }) {
  const { type } = query;
  const postIds = await getPostIds(type);

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const [data, hasMore] = await getData(postIds, query);

  return { props: { data, hasMore } };
}
