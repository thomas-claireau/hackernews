import Container from "@/components/Container";
import Filters from "@/components/Filters";
import Layout from "@/components/Layout";

export default function User({ user }) {
  console.log(user);

  return (
    <Layout>
      <Container className="mt-8 flex flex-col items-center gap-8">user</Container>
    </Layout>
  );
}

export async function getServerSideProps({ res, query }) {
  const user = await fetch(`https://hacker-news.firebaseio.com/v0/user/jl.json?print=pretty`);
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return { props: { user: await user.json() } };
}
