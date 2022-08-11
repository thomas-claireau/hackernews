import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import Container from "./Container";
import InfiniteLoader from "./InfiniteLoader";

export default function Posts({ data, isFilter = false, setIsFilter = undefined }) {
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
  );
}
