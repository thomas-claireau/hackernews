import { Post } from "@/types/posts";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import Container from "./Container";
import InfiniteLoader from "./InfiniteLoader";

type Props = {
  className?: string;
  data: Post[];
  isFilter?: boolean;
  setIsFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
};

export default function Posts({ className, data, isFilter = false, setIsFilter = undefined, hasMore }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const renderPosts = useMemo(() => {
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

    if (setIsFilter) setIsFilter(false);
  }, [data]);

  return (
    <InfiniteScroll
      className={`${className} mt-8 relative !overflow-hidden`}
      dataLength={posts.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<InfiniteLoader />}
    >
      <Container className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 lg:grid-cols-3">{renderPosts}</Container>
    </InfiniteScroll>
  );
}
