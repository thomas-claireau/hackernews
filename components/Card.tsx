import { Post } from "@/types/posts";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function Card({ post }: Props) {
  console.log(post);

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body justify-between">
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
