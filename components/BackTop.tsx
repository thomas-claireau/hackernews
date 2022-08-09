import { useCallback, useEffect, useState } from "react";
import ArrowTopSVG from "./ui/ArrowTopSVG";

export default function BackTop() {
  const [scrollY, setScrollY] = useState(0);
  const [onTop, setOnTop] = useState(false);

  const onScroll = useCallback(() => {
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => setOnTop(scrollY > 0), [scrollY]);

  return (
    onTop && (
      <button className="btn btn-circle fixed bottom-6 right-5 ml-auto" onClick={() => window.scrollTo(0, 0)}>
        <ArrowTopSVG />
      </button>
    )
  );
}
