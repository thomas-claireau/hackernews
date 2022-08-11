import Container from "@/components/Container";
import Filters from "@/components/Filters";
import Layout from "@/components/Layout";
import Posts from "@/components/Posts";
import { getData } from "@/lib/pages";

export default function User({ user, data }) {
  console.log(user);
  console.log(data);

  return (
    <Layout>
      {/* <Container className="mt-8 flex flex-col items-center gap-8"></Container> */}
      <Posts data={data} />
    </Layout>
  );
}

export async function getServerSideProps({ res, query }) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${query.slug}.json?print=pretty`);
  const user = await response.json();
  const submittedPostIds = user.submitted || [];

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return { props: { user, data: await getData(submittedPostIds, query) } };
}
