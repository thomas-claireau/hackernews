import { useAppContext } from "@/AppContext";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Posts from "@/components/Posts";
import StarSVG from "@/components/ui/StarSVG";
import { getData } from "@/lib/pages";
import { Post } from "@/types/posts";
import { HnUser } from "@/types/hnUser";

type Props = {
  user: HnUser;
  data: Post[];
  hasMore: boolean;
};

export default function User({ user, data, hasMore }: Props) {
  const { i18n } = useAppContext();
  const date = new Date(user.created * 1000);

  return (
    <Layout>
      <Container className="mt-12 flex flex-col gap-8">
        <div className="flex items-start flex-col gap-8 justify-between md:flex-row md:items-center">
          <h1 className="text-7xl font-bold">{`@${user?.id}`}</h1>
          <div className="flex gap-4 items-center md:flex-col md:items-end md:gap-2">
            <div className="flex items-center gap-2 text-2xl">
              <StarSVG className="h-6 w-6 stroke-current" />
              {user?.karma}
            </div>
            <div className="text-base-content/70 ">{`${i18n?.since} ${date.toLocaleDateString()}`}</div>
          </div>
        </div>
        <div className="text-base-content/70 text-2xl">{user?.about}</div>
      </Container>
      <Posts className="mt-12" data={data} hasMore={hasMore} />
    </Layout>
  );
}

export async function getServerSideProps({ res, query }) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${query.slug}.json?print=pretty`);
  const user = await response.json();
  const submittedPostIds = user.submitted || [];

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const [data, hasMore] = await getData(submittedPostIds, query);

  return { props: { user, data, hasMore } };
}
