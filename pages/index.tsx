import Card from "@/components/Card";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Post } from "@/types/posts";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  return (
    <div>
      <Header />
      <Container className="mt-8 grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </Container>
    </div>
  );
}

async function getPostIds(limit = 30) {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
  const postIds = await res.json();

  return postIds.slice(0, limit);
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
