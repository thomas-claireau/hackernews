import { useAppContext } from "@/AppContext";
import { MouseEvent } from "react";

type Filter = {
  name: string;
  active: boolean;
};

type Props = {
  filters: Filter[];
  onClick: (e: MouseEvent, filterName: string) => void;
};

export default function Filters({ filters, onClick }: Props) {
  const { i18n } = useAppContext();

  return (
    <div className="tabs tabs-boxed">
      {filters.map((filter) => (
        <a
          key={filter.name}
          className={`tab ${filter.active ? "tab-active" : ""}`}
          onClick={(e) => onClick(e, filter.name)}
        >
          {i18n?.[filter.name]}
        </a>
      ))}
    </div>
  );
}
