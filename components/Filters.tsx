import { useAppContext } from "@/AppContext";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import SpinnerSVG from "./ui/SpinnerSVG";

type Props = {
  loading: boolean;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Filters({ loading, setIsFilter }: Props) {
  const { i18n } = useAppContext();
  const router = useRouter();
  const [filters, setFilters] = useState([
    {
      name: "topstories",
      active: true,
    },
    {
      name: "newstories",
      active: false,
    },
  ]);

  const handleFilters = useCallback(
    (e, filterName) => {
      const elt = e.currentTarget;
      if (elt.classList.contains("tab-active")) return;

      setFilters((prevFilters) =>
        prevFilters.map((filter) => ({
          name: filter.name,
          active: filter.name === filterName,
        }))
      );

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: 1, type: filterName },
        },
        router.pathname
      );

      setIsFilter(true);
    },
    [router]
  );

  return (
    <div className="tabs tabs-boxed">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={`flex items-center gap-2 tab ${filter.active ? "tab-active" : ""}`}
          onClick={(e) => handleFilters(e, filter.name)}
          disabled={loading}
        >
          {filter.active && loading && <SpinnerSVG className="h-4 w-4 animate-spin fill-current" />}
          {i18n?.[filter.name]}
        </button>
      ))}
    </div>
  );
}
