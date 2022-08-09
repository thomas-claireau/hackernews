import Link from "next/link";
import Container from "./Container";
import GithubSVG from "./ui/GithubSVG";

export default function Header() {
  return (
    <div className="w-full bg-base-300">
      <Container className="navbar">
        <div className="flex-1">
          <Link href="/">
            <a className="normal-case font-bold text-2xl">
              hacker
              <span className="text-secondary">news</span>
            </a>
          </Link>
        </div>
        <div className="flex-none normal-case text-2xl">
          <GithubSVG className="h-6 w-6" />
        </div>
      </Container>
    </div>
  );
}
