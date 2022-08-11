import SpinnerSVG from "./ui/SpinnerSVG";

export default function InfiniteLoader() {
  return (
    <div className="absolute bottom-2 left-2">
      <SpinnerSVG className="h-6 w-6 animate-spin fill-current" />
    </div>
  );
}
