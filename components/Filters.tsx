import { useAppContext } from "@/AppContext";
import { MouseEvent } from "react";
import SpinnerSVG from "./ui/SpinnerSVG";

type Filter = {
  name: string;
  active: boolean;
};

type Props = {
  filters: Filter[];
  onClick: (e: MouseEvent, filterName: string) => void;
  loading: boolean;
};

export default function Filters({ filters, onClick, loading }: Props) {
  const { i18n } = useAppContext();

  return (
    <div className="tabs tabs-boxed">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={`flex items-center gap-2 tab ${filter.active ? "tab-active" : ""}`}
          onClick={(e) => onClick(e, filter.name)}
          disabled={loading}
        >
          {filter.active && loading && <SpinnerSVG className="h-4 w-4 animate-spin fill-current" />}
          {i18n?.[filter.name]}
        </button>
      ))}
    </div>
  );
}
