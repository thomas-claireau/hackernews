import { Post } from "@/types/posts";
import Link from "next/link";
import CaretUpSVG from "./ui/CaretUpSVG";

type Props = {
  post: Post;
};

export default function Card({ post }: Props) {
  const date = new Date(post.time * 1000);

  // console.log(post);

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body justify-between">
        <div className="flex justify-between">
          <div className="text-base-content/70 text-sm">
            {`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}
          </div>
          <div className="badge badge-secondary gap-1">
            <CaretUpSVG className="h-3 w-3 fill-current" />
            {post?.score}
          </div>
        </div>
        <h2 className="card-title">{post?.title}</h2>
        <Link href={`/users/${post?.by}`}>
          <a className="link link-secondary">@{post?.by}</a>
        </Link>
        <div className="card-actions justify-end">
          <a className="btn btn-primary" href={post?.url} target="blank">
            Read
          </a>
        </div>
      </div>
    </div>
  );
}
