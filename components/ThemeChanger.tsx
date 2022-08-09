import { useTheme } from "next-themes";
import MoonSVG from "./ui/MoonSVG";
import SunSVG from "./ui/SunSVG";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  function handleInput(e) {
    setTheme(e.currentTarget.checked ? "dracula" : "light");
  }

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onInput={handleInput} />
      <SunSVG className="swap-on fill-current w-7 h-7" />
      <MoonSVG className="swap-off fill-current w-7 h-7" />
    </label>
  );
}
